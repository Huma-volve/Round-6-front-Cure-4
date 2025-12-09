import { editUserProfile } from "@/api/Profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditProfile() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editUserProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/profile", {
        state: {
          name: data?.data.name,
          email: data?.data.email,
          image: data?.data.profile_photo,
        },
      });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
