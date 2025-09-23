import { deleteFavoritesDoctors } from "@/api/Favorite";
import type { FavoriteResponse } from "@/types/ProfileTypes/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (doctorID: number) => deleteFavoritesDoctors(doctorID),
    onMutate: async (doctorID) => {
      //cancel ongoing fetches so we do not update favourites.
      await queryClient.cancelQueries({ queryKey: ["favorite-doctors"] });
      //snapshot current cache
      const previousFavoriteDoctors =
        queryClient.getQueryData<FavoriteResponse>(["favorite-doctors"]);
      console.log("from hook", previousFavoriteDoctors);

      //update cache ... remove favourite doctor
      queryClient.setQueryData<FavoriteResponse>(
        ["favorite-doctors"],
        (old) => {
          if (!old) return { success: true, message: "", data: [] };
          return {
            ...old,
            data: old.data.filter((doc) => doc.user_id !== doctorID),
          };
        }
      );
      //return old incase of rollback

      return { previousFavoriteDoctors };
    },
    //Rollback if error
    onError: (_err, _doctorID, context) => {
      if (context?.previousFavoriteDoctors) {
        console.log("onErrorContext", context);
        queryClient.setQueryData(
          ["favorite-doctors"],
          context.previousFavoriteDoctors
        );
      }
    },
    //Refetch to confirm backend is in sync with ui
    onSettled: (_data, _error, _doctorID, context) => {
      console.log("onSettled context", context);
      queryClient.invalidateQueries({ queryKey: ["favorite-doctors"] });
    },
  });
}
