import { useMutation } from '@tanstack/react-query';
import { registerPost } from '../api/Auth';
import { useNavigate } from 'react-router';


export const useRegister = () => {

  const navigate = useNavigate()

  return useMutation({
    mutationFn: registerPost,
    onSuccess:()=>{
        navigate('/')
    }
 })
};