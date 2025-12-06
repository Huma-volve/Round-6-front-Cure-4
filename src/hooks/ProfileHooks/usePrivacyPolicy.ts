import { privacyContent } from "@/api/Profile";
import type { PrivacyPolicyResponse } from "@/types/profileTypes";
import { useQuery } from "@tanstack/react-query";
export function usePrivacyPolicy() {
  return useQuery<PrivacyPolicyResponse, Error>({
    queryKey: ["privacy-policy"],
    queryFn: privacyContent,
  });
}
