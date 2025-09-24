import { privacyContent } from "@/api/Profile";
import type { PrivacyPolicyResponse } from "@/types/ProfileTypes/types";
import { useQuery } from "@tanstack/react-query";
export function usePrivacyPolicy() {
  return useQuery<PrivacyPolicyResponse, Error>({
    queryKey: ["privacy-policy"],
    queryFn: privacyContent,
  });
}
