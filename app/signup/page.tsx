"use client";

import { useState } from "react";
import AuthInput from "@/components/AuthInput";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import CustomDropdown from "@/components/CustomDropdown";
import { sendOTP, signup, googleSignUp } from "@/services/auth";
import  SignupSchema  from "@/Schemas/signupSchema";
import Link from "next/link";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Prata,
  Abril_Fatface,
  Domine,
  Roboto_Slab,
  Cormorant_Garamond,
} from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const prata = Prata({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"],
});

const af = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["mono"],
});

const i_serif = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

const domine = Domine({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"],
});

const cd = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"],
  variable: "--font-cormorant-garamond",
});

const BRANCHES = [
  { value: "CSE", label: "Computer Science & Engineering" },
  { value: "CSE AI ML", label: "CSE - AI & Machine Learning" },
  { value: "IT", label: "Information Technology" },
  { value: "EE", label: "Electrical Engineering" },
  { value: "EEE", label: "Electronics & Electrical Engineering" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "CE", label: "Civil Engineering" },
  { value: "CHE", label: "Chemical Engineering" },
  { value: "PE", label: "Production Engineering" },
  { value: "Biomed", label: "Biomedical Engineering" },
  { value: "Fire Safety", label: "Fire Safety Engineering" },
  { value: "Smart Manufacturing", label: "Smart Manufacturing" },
  { value: "MSc", label: "Master of Science" },
  { value: "MTech", label: "Master of Technology" },
  { value: "Others", label: "Others" },
];

const YEARS = [
  { value: "2029", label: "2029" },
  { value: "2028", label: "2028" },
  { value: "2027", label: "2027" },
  { value: "2026", label: "2026" },
];

export default function SignupPage() {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [nameError, setNameError] = useState<boolean | string>("");
  const [nameErr, setNameErr] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean | string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [confirmpasswordError, setConfirmPasswordError] = useState<boolean | string>("");
  const [confirmpasswordErr, setconfirmpassworderr] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean | string>("");
  const [passwordErr, setpassworderr] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean | string>("");
  const [phoneErr, setPhoneErr] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "vssut", // vssut / non_vssut
    gradYear: YEARS[0].value,
    branch: BRANCHES[0].value,
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // helpers
  const isValidEmail = (email: string) =>
    /^\S+@\S+\.\S+$/.test(email.toLowerCase());

  const isValidPhone = (phone: string) =>
    /^\d{10}$/.test(phone.replace(/\s+/g, ""));

  const validateStep1 = () => {
    const errs = { name: "", email: "", phone: "" };
    let ok = true;
    if (!form.name.trim()) {
      errs.name = "Please enter your name";
      ok = false;
    }
    if (!isValidEmail(form.email)) {
      errs.email = "Please enter a valid email";
      ok = false;
    }
    if (!isValidPhone(form.phone)) {
      errs.phone = "Phone number should be 10 digits";
      ok = false;
    }
    setErrors((prev) => ({ ...prev, ...errs }));
    return ok;
  };

  const validateStep2 = () => {
    const errs = { otp: "", password: "", confirmPassword: "" };
    let ok = true;
    if (!form.otp.trim()) {
      errs.otp = "OTP is required";
      ok = false;
    }
    if (form.password.length < 6) {
      errs.password = "Password should be at least 6 characters";
      ok = false;
    }
    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
      ok = false;
    }
    setErrors((prev) => ({ ...prev, ...errs }));
    return ok;
  };

  const validatePassword = () => {
    const res = SignupSchema.shape.password.safeParse(form.password);
    if (!res.success) {
      setPasswordError(false);
      setpassworderr(res.error.issues[0].message);
    } else {
      setPasswordError(true);
    }
  };

  const validateConfirmPassword = ()=>{
    const res = SignupSchema.shape.confirmPassword.safeParse(form.confirmPassword);
    if(!res.success){
      setConfirmPasswordError(false);
      setconfirmpassworderr(res.error.issues[0].message);
    }else{
      setConfirmPasswordError(true);
    }
    if(form.password!=form.confirmPassword){
      setConfirmPasswordError(false);
      setconfirmpassworderr("Passwords do not match.");
    }
  }

  const validateEmail = () => {
    const res = SignupSchema.shape.email.safeParse(form.email);
    if (!res.success) {
      setEmailError(false);
      setEmailErr(res.error.issues[0].message);
    } else {
      setEmailError(true);
    }
  };

  const validateName = () => {
    const res = SignupSchema.shape.name.safeParse(form.name);
    if (!res.success) {
      setNameError(false);
      setNameErr(res.error.issues[0].message);
    } else {
      setNameError(true);
    }
  };

  const validatePhone = () => {
    const res = SignupSchema.shape.phone.safeParse(form.phone);
    if (!res.success) {
      setPhoneError(false);
      setPhoneErr(res.error.issues[0].message);
    } else {
      setPhoneError(true);
    }
  };

  const handleSendOTP = async () => {
    const res = SignupSchema.safeParse({ name: form.name, email: form.email, phone: form.phone });
    if(!res.success){
      const emailInValid: object | undefined = res.error.issues.find((issue)=>issue.path[0]==="email");
      const nameInValid: object | undefined = res.error.issues.find((issue)=>issue.path[0]==="name");
      const phoneInValid: object | undefined = res.error.issues.find((issue)=>issue.path[0]==="phone");
      if(emailInValid){
        setEmailError(false);
        setEmailErr(emailInValid.message);
      }
      if(nameInValid){
        setNameError(false);
        setNameErr(nameInValid.message);
      }
      if(phoneInValid){
        setPhoneError(false);
        setPhoneErr(phoneInValid.message);
      }
      return;
    }
    
    setLoading(true);
    try {
      await sendOTP({ email: form.email });
      setStep(2);
      alert("OTP sent to your email. Please check and continue.");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        otp: form.otp,
        phone: form.phone,
        institution: form.institution,
        gradYear: form.gradYear,
        branch: form.branch,
      };

      await signup(payload);
      alert("Signup successful! Please login.");
      // Optionally redirect to login or homepage
      setStep(1);
      setForm({
        name: "",
        email: "",
        phone: "",
        institution: "vssut",
        gradYear: YEARS[0].value,
        branch: BRANCHES[0].value,
        otp: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential: string) => {
    setLoading(true);
    try {
      const payload = {
        credential,
        phone: form.phone,
        institution: form.institution,
        gradYear: form.gradYear,
        branch: form.branch,
      };
      await googleSignUp(payload);
      alert("Google Sign-Up successful! Please login.");
      // Reset form and redirect
      setStep(1);
      setForm({
        name: "",
        email: "",
        phone: "",
        institution: "vssut",
        gradYear: YEARS[0].value,
        branch: BRANCHES[0].value,
        otp: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Google Sign-Up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error: string) => {
    alert(error);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Top stepper and title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-3">
            {[1, 2].map((s) => (
              <button
                key={s}
                type="button"
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors
              ${
                step >= s
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 cursor-default">
            Step {step} of 2
          </span>
        </div>
        <fieldset className="pb-8 px-[20px] md:px-8 pt-3 border-2 border-gray-500 rounded-2xl max-md:mx-[6.5px]">
          <legend
            className={`text-3xl font-bold ${prata.className} text-center cursor-default text-white`}
          >
            Signup
          </legend>
          <p
            className={`text-lg text-center ${af.className} cursor-default text-gray-100 mb-5`}
          >
            Create your account
          </p>

          {step === 1 && (
            <>
              <div className="space-y-6">
                {/* Google Sign-Up */}
                <GoogleSignInButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  disabled={loading}
                  text="Sign up with Google"
                />

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span
                      className={`px-[6.5px] ${i_serif.className} cursor-default bg-black text-gray-200`}
                    >
                      Or continue with email
                    </span>
                  </div>
                </div>
                <div>
                  <TextField
                    label="Name*"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "black",
                        borderRadius: "0.5rem",
                        "& fieldset": {
                          borderColor: nameError === false
                            ? "red"
                            : nameError === true
                            ? "green"
                            : "#6b7280",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6b7280",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#d1d5db",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root":
                        {
                          color: "gray.300",
                        },
                      "& .MuiOutlinedInput-input": {
                        color: "#d1d5db",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#d1d5db",
                        opacity: 1,
                      },
                    }}
                    onBlur={validateName}
                  />
                  <AnimatePresence>
                    {!nameError && nameErr && (
                      <motion.p
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="text-red-700 font-bold mt-2"
                      >
                        {nameErr}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <TextField
                    label="Email*"
                    id="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "black",
                        borderRadius: "0.5rem",
                        "& fieldset": {
                          borderColor: emailError === false
                            ? "red"
                            : emailError === true
                            ? "green"
                            : "#6b7280",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6b7280",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#d1d5db",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root":
                        {
                          color: "gray.300",
                        },
                      "& .MuiOutlinedInput-input": {
                        color: "#d1d5db",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#d1d5db",
                        opacity: 1,
                      },
                    }}
                    onBlur={validateEmail}
                  />
                  <AnimatePresence>
                    {!emailError && emailErr && (
                      <motion.p
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="text-red-700 font-bold mt-2"
                      >
                        {emailErr}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <TextField
                    label="Phone*"
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "black",
                        borderRadius: "0.5rem",
                        "& fieldset": {
                          borderColor: phoneError === false
                            ? "red"
                            : phoneError === true
                            ? "green"
                            : "#6b7280",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6b7280",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#d1d5db",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root":
                        {
                          color: "gray.300",
                        },
                      "& .MuiOutlinedInput-input": {
                        color: "#d1d5db",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#d1d5db",
                        opacity: 1,
                      },
                    }}
                    onBlur={validatePhone}
                  />
                  <AnimatePresence>
                    {(!phoneError && phoneErr) && (<motion.p initial={{y:-15,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-15,opacity:0}} className="text-red-700 font-bold mt-2">{phoneErr}</motion.p>)}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Institution
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "vssut", label: "VSSUT" },
                      { value: "non_vssut", label: "Non-VSSUT" },
                    ].map((inst) => (
                      <label
                        key={inst.value}
                        className={`flex items-center px-4 py-3 rounded-lg border cursor-pointer text-sm font-medium transition-colors
                  ${
                    form.institution === inst.value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 hover:border-gray-400 text-white"
                  }`}
                      >
                        <input
                          type="radio"
                          name="institution"
                          value={inst.value}
                          checked={form.institution === inst.value}
                          onChange={(e) =>
                            setForm({ ...form, institution: e.target.value })
                          }
                          className="mr-2"
                        />
                        {inst.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Graduation Year
                  </label>
                  <CustomDropdown
                    options={YEARS}
                    value={form.gradYear}
                    onChange={(value) => setForm({ ...form, gradYear: value })}
                    placeholder="Select graduation year"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Branch
                  </label>
                  <CustomDropdown
                    options={BRANCHES}
                    value={form.branch}
                    onChange={(value) => setForm({ ...form, branch: value })}
                    placeholder="Select your branch"
                  />
                </div>
                <div className="flex justify-center gap-1 md:gap-[3px]">
                  <p className="text-[15.5px] max-md:text-[14.5px] text-white font-medium md:font-semibold cursor-default">
                    Already Registered?{" "}
                  </p>
                  <Link
                    href="/login"
                    className="max-md:text-[14.5px] text-[15.5px] text-emerald-600 hover:text-emerald-700 hover:underline focus:text-emerald-700 focus:underline font-medium md:font-semibold"
                  >
                    Login
                  </Link>
                </div>
                <button
                  onMouseDown={handleSendOTP}
                  disabled={loading}
                  className="w-full py-3 mt-4 rounded-lg cursor-pointer bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:bg-emerald-300 transition-colors shadow-sm"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP
                </label>
                <AuthInput
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="6 digits"
                  value={form.otp}
                  onChange={(e) => setForm({ ...form, otp: e.target.value })}
                />
                {errors.otp && (
                  <p className="mt-1 text-xs text-red-500">{errors.otp}</p>
                )}
              </div>

              <div>
                <TextField
                  label="Password*"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#d1d5db" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "black",
                      borderRadius: "0.5rem",
                      "& fieldset": {
                        borderColor: passwordError === false
                            ? "red"
                            : passwordError === true
                            ? "green"
                            : "#6b7280",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6b7280",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#d1d5db",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root":
                      {
                        color: "gray.300",
                      },
                    "& .MuiOutlinedInput-input": {
                      color: "#d1d5db",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "#d1d5db",
                      opacity: 1,
                    },
                  }}
                  onBlur={validatePassword}
                />
                <AnimatePresence>
                  {!passwordError && passwordErr && (
                    <motion.p
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ y: -15, opacity: 0 }}
                    >
                      {passwordErr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <TextField
                  label="Confirm Password*"
                  id="currentpassword"
                  name="currentpassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCurrentPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#d1d5db" }}
                        >
                          {showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "black",
                      borderRadius: "0.5rem",
                      "& fieldset": {
                        borderColor: confirmpasswordError === false
                            ? "red"
                            : confirmpasswordError === true
                            ? "green"
                            : "#6b7280",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6b7280",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#d1d5db",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root":
                      {
                        color: "gray.300",
                      },
                    "& .MuiOutlinedInput-input": {
                      color: "#d1d5db",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "#d1d5db",
                      opacity: 1,
                    },
                  }}
                  onBlur={validateConfirmPassword}
                />
                <AnimatePresence>
                  {(!confirmpasswordError && confirmpasswordErr) && (
                    <motion.p
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ y: -15, opacity: 0 }}
                    >
                      {confirmpasswordErr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="flex-1 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:bg-emerald-300 text-sm shadow-sm"
                >
                  {loading ? "Signing up..." : "Complete Signup"}
                </button>
              </div>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
}
