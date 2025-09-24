export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar:string
  
}


export interface AuthContextType {
  userInfo: UserInfo | null; 
}


export interface RegisterData {
  name: string;  
  email: string;
  password: string;
  password_confirmation:string;
}


export interface RegisterResponse {
  user: UserInfo
}


export interface LoginData { 
  email: string;
  password: string;
}


export interface LoginResponse {
  user: UserInfo
}

export interface ResetOTP { 
  otp: string;  
  email: string;
  password: string;
  password_confirmation:string;

}