import type {
  AddFavoriteResponse,
  DeleteFavoriteResponse,
  FavoriteResponse,
} from "@/types/ProfileTypes/types";

const token = localStorage.getItem("token");
const baseURL = import.meta.env.VITE_BASE_URL;
export async function getFavoritesDoctors(): Promise<FavoriteResponse> {
  try {
    const res = await fetch(`${baseURL}Customer/Favourites/GetAllFavourites`, {
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
export async function deleteFavoritesDoctors(
  doctorID: number
): Promise<DeleteFavoriteResponse> {
  try {
    const res = await fetch(`${baseURL}favourites/doctors/${doctorID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(doctorID);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Delete failed");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected delete error");
  }
}
export async function addFavoriteDoctor(
  doctorID: number
): Promise<AddFavoriteResponse> {
  try {
    const res = await fetch(`${baseURL}favourites/doctors/${doctorID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Post failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected post error");
  }
}
