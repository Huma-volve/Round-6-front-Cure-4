import { getAllCards } from "@/api/Profile";
import type { AllCardsResponse } from "@/types/ProfileTypes/types";
import { useQuery } from "@tanstack/react-query";
export function useAllCards() {
  return useQuery<AllCardsResponse, Error>({
    queryKey: ["allCards"],
    queryFn: getAllCards,
  });
}
