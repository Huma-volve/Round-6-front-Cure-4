import { editUserProfile } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useEditProfile() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editUserProfile,
    onSuccess: () => {
      navigate("/");
    },
  });
}
