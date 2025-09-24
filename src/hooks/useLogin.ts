import { loginUser } from "@/api/Auth";
import { Authcontext } from "@/context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router";



export const useLogin = () => {

  const navigate = useNavigate()
  const{setToken ,setUserInfo}=useContext(Authcontext)

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.data.data.token)
      localStorage.setItem("token",data.data.data.token)
      setUserInfo(data.data.data.user)
      navigate("/home")
      
    },
    onError: (error) => {
      throw new Error(error.response?.data?.message)
    },
  });
};