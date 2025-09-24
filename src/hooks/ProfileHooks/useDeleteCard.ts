import { deleteCard } from "@/api/Profile";
import type { AllCardsResponse } from "@/types/ProfileTypes/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardID: number) => deleteCard(cardID),
    onMutate: async (cardID) => {
      //cancel ongoing fetches so we do not update cards.
      await queryClient.cancelQueries({ queryKey: ["allCards"] });
      //snapshot current cache
      const previousCards = queryClient.getQueryData<AllCardsResponse>([
        "allCards",
      ]);
      console.log("from hook", previousCards);

      //update cache ... remove card
      queryClient.setQueryData<AllCardsResponse>(["allCards"], (old) => {
        if (!old) return { success: true, message: "", data: [] };
        return {
          ...old,
          data: old.data.filter((doc) => doc.id !== cardID),
        };
      });
      //return old incase of rollback

      return { previousCards };
    },
    //Rollback if error
    onError: (_err, _cardID, context) => {
      if (context?.previousCards) {
        console.log("onErrorContext", context);
        queryClient.setQueryData(["allCards"], context.previousCards);
      }
    },
    //Refetch to confirm backend is in sync with ui
    onSettled: (_data, _error, _cardID, context) => {
      console.log("onSettled context", context);
      queryClient.invalidateQueries({ queryKey: ["allCards"] });
    },
  });
}
