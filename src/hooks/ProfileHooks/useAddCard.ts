import { addNewCard } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddCard() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addNewCard,
    onSuccess: () => {
      navigate("/payment-method-card");
    },
  });
}
