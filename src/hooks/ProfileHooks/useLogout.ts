import { logout } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
      //should navigate to login
    },
    onError: () => {
      toast.error("Error logging out!");
    },
  });
}
