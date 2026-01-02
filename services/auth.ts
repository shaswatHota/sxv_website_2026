import api from "@/utils/api";

export const sendOTP = (data: { email: string }) => api.post("/sendOTP", data);

export const signup = (data: {
  name: string;
  email: string;
  password: string;
  otp: string;
  phone?: string;
  institution?: "vssut" | "non_vssut";
  gradYear?: string;
  branch?: string;
}) => api.post("/signup", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/login", data);

export const googleSignIn = (data: { credential: string }) =>
  api.post("/auth/google", data);

export const googleSignUp = (data: { 
  credential: string; 
  phone?: string;
  institution?: "vssut" | "non_vssut";
  gradYear?: string;
  branch?: string;
}) => api.post("/auth/google/signup", data);
