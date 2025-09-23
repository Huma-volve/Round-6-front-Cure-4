import { addFavoriteDoctor } from "@/api/Favorite";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useAddFavorite() {
  return useMutation({
    mutationFn: (doctorID: number) => addFavoriteDoctor(doctorID),
    onSuccess: () => {
      toast.success("Doctor added to favorites!");
    },
  });
}
