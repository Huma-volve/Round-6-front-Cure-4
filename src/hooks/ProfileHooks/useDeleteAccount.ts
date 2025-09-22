import { deleteAccount } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (password: string) => deleteAccount(password),
    onSuccess: () => {
      navigate("/bookings");
      //should navigate to signup
    },
  });
}
