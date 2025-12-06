import { getBookings } from "@/api/Bookings";
import type { BookingsResponse } from "@/types/appointmentTypes";
import { useQuery } from "@tanstack/react-query";

export function useGetBookings(filter: string) {
  return useQuery<BookingsResponse, Error>({
    queryKey: ["get_bookings", filter],
    queryFn: () => getBookings(filter),
  });
}
