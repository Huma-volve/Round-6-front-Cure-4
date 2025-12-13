import { loginUser } from "@/api/Auth";
import { Authcontext } from "@/context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken, setUserInfo } = useContext(Authcontext);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
      setUserInfo(data.data[0]);
      navigate("/home");
    },
  });
};
