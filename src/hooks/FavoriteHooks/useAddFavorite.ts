import { addFavoriteDoctor } from "@/api/Favorite";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddCard() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (doctorID: number) => addFavoriteDoctor(doctorID),
    onSuccess: () => {
      navigate("/favourite");
    },
  });
}
