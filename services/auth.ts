import api from "@/utils/api";

export const sendOTP = (data: { email: string }) => api.post("api/auth/sendOTP", data);

export const signup = (data: {
  name: string;
  email: string;
  password: string;
  otp: string;
  phone?: string;
  institution?: string;
  gradYear?: string;
  branch?: string;
}) => api.post("api/auth/signup", data);

export const login = (data: { email: string; password: string }) =>
  api.post("api/auth/login", data);

export const verifyOTP = (data:{email:string,otp:string})=>api.post("api/auth/verifyOTP",data);

export const verifyEmail = (data:{email:string})=>api.post("api/password/forgotpassword",data);

export const forgotPassword = (data:{email:string})=>api.post("api/password/changepassword",data);
