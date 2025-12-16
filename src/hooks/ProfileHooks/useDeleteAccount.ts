import { deleteAccount } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
      //should navigate to signup
    },
    onError: () => {
      toast.error("Error deleting you account!");
    },
  });
}
