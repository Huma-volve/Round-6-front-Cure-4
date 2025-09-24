import { getUserProfile } from "@/api/Profile";
import type { ProfileResponse } from "@/types/ProfileTypes/types";
import { useQuery } from "@tanstack/react-query";
export function useProfile() {
  return useQuery<ProfileResponse, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
}
