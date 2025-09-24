import { getFavoritesDoctors } from "@/api/Favorite";
import type { FavoriteResponse } from "@/types/ProfileTypes/types";
import { useQuery } from "@tanstack/react-query";
export function useGetFavorites() {
  return useQuery<FavoriteResponse, Error>({
    queryKey: ["favorite-doctors"],
    queryFn: getFavoritesDoctors,
  });
}
