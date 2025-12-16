import { addNewCard } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAddCard() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addNewCard,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/payment-method-card");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
