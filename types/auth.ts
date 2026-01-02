export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  otp: string;
  phone?: string;
  institution?: "vssut" | "non_vssut";
  gradYear?: string;
  branch?: string;
}
