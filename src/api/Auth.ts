import axios from "axios";
import type {
  RegisterData,
  RegisterResponse,
  LoginData,
  LoginResponse,
  ResetOTP,
} from "@/types/types";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const registerPost = (
  userdata: RegisterData
): Promise<RegisterResponse> => {
  return axios.post(`${baseURL}register`, userdata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginUser = (userdata: LoginData): Promise<LoginResponse> => {
  return axios.post(`${baseURL}login`, userdata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sendOTPToUser = (userdata: ResetOTP) => {
  return axios.post(
    `${baseURL}forgot-password/send-otp?email=${userdata.email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const verifyUserOTP = (userdata: ResetOTP) => {
  return axios.post(`${baseURL}forgot-password/verify-otp`, userdata, {
    headers: {
      token,
    },
  });
};

export const resetPassword = (userdata: ResetOTP) => {
  return axios.post(`${baseURL}forgot-password/reset`, userdata, {
    headers: {
      token,
    },
  });
};
