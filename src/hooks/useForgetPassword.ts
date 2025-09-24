import { resetPassword, sendOTPToUser, verifyUserOTP } from '@/api/Auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useForgetPassword() {

  const navigate = useNavigate()


  const sendOtp =useMutation({
    mutationFn: sendOTPToUser,
  });


  const verifyOTP = useMutation({
    mutationFn: verifyUserOTP,
    onSuccess: () => {
      navigate("/resetOtp")
    }
  });


  const resetUserPass = useMutation({
    mutationFn:resetPassword,
    onSuccess:()=>{
      navigate('/')
    }
  })


    return {sendOtp ,resetUserPass ,verifyOTP}
}
