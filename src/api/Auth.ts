import axios from "axios";
import type {
  RegisterData,
  RegisterResponse,
  LoginData,
  LoginResponse,
  ResetOTP,
} from "@/types/types";
const baseURL = import.meta.env.VITE_BASE_URL;
// const url =
//   "https://round5-online-booking-with-doctor-api.digital-vision-solutions.com/api";

const token = localStorage.getItem("token");

export const registerPost = (
  userdata: RegisterData
): Promise<RegisterResponse> => {
  return axios.post(`${baseURL}Identity/Accounts/Register`, userdata, {
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
  return axios.post(`${baseURL}send-reset-otp`, userdata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const verifyUserOTP = (userdata: ResetOTP) => {
  return axios.post(`${baseURL}verify-otp`, userdata, {
    headers: {
      token,
    },
  });
};

export const resetPassword = (userdata: ResetOTP) => {
  return axios.post(`${baseURL}reset-password`, userdata, {
    headers: {
      token,
    },
  });
};
