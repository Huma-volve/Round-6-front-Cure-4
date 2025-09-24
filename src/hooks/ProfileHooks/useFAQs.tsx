import { FAQsContent } from "@/api/Profile";
import type { FAQsResponse } from "@/types/ProfileTypes/types";
import { useQuery } from "@tanstack/react-query";
export function useFAQs() {
  return useQuery<FAQsResponse, Error>({
    queryKey: ["FAQs"],
    queryFn: FAQsContent,
  });
}
