import type { BookingsResponse } from "@/types/appointmentTypes";

// const token = localStorage.getItem("token");
const token = "125|Y8xzWNMfvCbjNksQh7NIEYLp3PdGgA3DOJWKFTWr23a6da5c";
console.log(token);
const baseURL = import.meta.env.VITE_BASE_URL;
export async function getBookings(filter: string): Promise<BookingsResponse> {
  try {
    const url =
      filter === "all" ? "patient/bookings" : `patient/bookings?${filter}`;
    //${baseURL}patient/bookings?${filter}
    const res = await fetch(`${baseURL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Fetch failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}
