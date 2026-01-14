"use client";

import { useState, useEffect } from "react";
import { sendOTP, signup } from "@/services/auth";
import SignupSchemaStep1 from "@/Schemas/SignupSchemaStep1";
import SignupSchemaStep2 from "@/Schemas/signupSchemaStep2";
import Link from "next/link";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Noto_Serif_JP, Zen_Tokyo_Zoo, Cinzel } from "next/font/google";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sword, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";


// --- Typography ---
const noto = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto",
});

const zen = Zen_Tokyo_Zoo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
});

// --- Constants ---
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
  { value: "2030", label: "2030" },
  { value: "2029", label: "2029" },
  { value: "2028", label: "2028" },
  { value: "2027", label: "2027" },
  { value: "2026", label: "2026" },
];

// --- Visual Components ---

const LanternSVG = () => (
  <svg
    width="80"
    height="140"
    viewBox="0 0 80 140"
    fill="none"
    className="drop-shadow-[0_5px_15px_rgba(234,88,12,0.4)]"
  >
    <line x1="40" y1="0" x2="40" y2="20" stroke="#431407" strokeWidth="4" />
    <path
      d="M10 30L40 20L70 30"
      stroke="#7c2d12"
      strokeWidth="4"
      fill="#431407"
    />
    <rect
      x="15"
      y="30"
      width="50"
      height="10"
      fill="#431407"
      stroke="#7c2d12"
      strokeWidth="2"
    />
    <rect
      x="15"
      y="40"
      width="50"
      height="70"
      fill="url(#lanternGlowSignup)"
      stroke="#7c2d12"
      strokeWidth="3"
    />
    <line
      x1="15"
      y1="58"
      x2="65"
      y2="58"
      stroke="#7c2d12"
      strokeWidth="2"
      opacity="0.7"
    />
    <line
      x1="15"
      y1="75"
      x2="65"
      y2="75"
      stroke="#7c2d12"
      strokeWidth="2"
      opacity="0.7"
    />
    <line
      x1="15"
      y1="92"
      x2="65"
      y2="92"
      stroke="#7c2d12"
      strokeWidth="2"
      opacity="0.7"
    />
    <text
      x="40"
      y="80"
      textAnchor="middle"
      fill="#431407"
      fontSize="24"
      fontFamily="var(--font-zen)"
      opacity="0.8"
    >
      登録
    </text>
    <rect
      x="20"
      y="110"
      width="40"
      height="15"
      fill="#431407"
      stroke="#7c2d12"
      strokeWidth="2"
    />
    <circle cx="40" cy="130" r="5" fill="#ea580c" />
    <defs>
      <radialGradient
        id="lanternGlowSignup"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(40 75) rotate(90) scale(35 25)"
      >
        <stop stopColor="#fbbf24" />
        <stop offset="0.8" stopColor="#ea580c" />
        <stop offset="1" stopColor="#9a3412" />
      </radialGradient>
    </defs>
  </svg>
);

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const lanternSway: Variants = {
  animate: {
    rotate: [-2, 2, -2],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const { login: authLogin } = useAuth();

  // Redirect if user is already logged in - only after component mounts
  useEffect(() => {
    if (mounted) {
      // Check if user is currently logged in (has valid token and user data)
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        // User is already logged in, redirect to home
        window.location.href = "/";
      }
    }
  }, [mounted]);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Error States
  const [nameError, setNameError] = useState<boolean | string>("");
  const [nameErr, setNameErr] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean | string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [confirmpasswordError, setConfirmPasswordError] = useState<
    boolean | string
  >("");
  const [confirmpasswordErr, setconfirmpassworderr] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean | string>("");
  const [passwordErr, setpassworderr] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean | string>("");
  const [phoneErr, setPhoneErr] = useState<string>("");
  const [regdNoError, setRegdNoError] = useState<boolean | string>("");
  const [regdNoErr, setRegdNoErr] = useState<string>("");
  const [otpError,setOtpError]=useState<string | boolean>("");
  const [otpErr,setOtpErr]=useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    regdNo: "",
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
    regdNo: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center bg-black ${noto.variable} ${zen.variable} ${cinzel.variable}`}
      >
        <div className="text-white font-cinzel">Loading...</div>
      </div>
    );
  }

  // --- Validation Logic ---
  const validatePassword = () => {
    const res = SignupSchemaStep2.shape.password.safeParse(form.password);
    if (!res.success) {
      setPasswordError(false);
      setpassworderr(res.error.issues[0].message);
    } else {
      setPasswordError(true);
    }
  };

  const validateConfirmPassword = () => {
    const res = SignupSchemaStep2.shape.confirmPassword.safeParse(
      form.confirmPassword
    );
    if (!res.success) {
      setConfirmPasswordError(false);
      setconfirmpassworderr(res.error.issues[0].message);
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setConfirmPasswordError(false);
      setconfirmpassworderr("Passwords do not match.");
      return;
    }
    
    // If all validations pass
    setConfirmPasswordError(true);
    setconfirmpassworderr("");
  };

  const validateEmail = () => {
    const res = SignupSchemaStep1.shape.email.safeParse(form.email);
    if (!res.success) {
      setEmailError(false);
      setEmailErr(res.error.issues[0].message);
    } else {
      setEmailError(true);
    }
  };

  const validateName = () => {
    const res = SignupSchemaStep1.shape.name.safeParse(form.name);
    if (!res.success) {
      setNameError(false);
      setNameErr(res.error.issues[0].message);
    } else {
      setNameError(true);
    }
  };

  const validatePhone = () => {
    const res = SignupSchemaStep1.shape.phone.safeParse(form.phone);
    if (!res.success) {
      setPhoneError(false);
      setPhoneErr(res.error.issues[0].message);
    } else {
      setPhoneError(true);
    }
  };

  const validateRegdNo = () => {
    const res = SignupSchemaStep1.shape.regdNo.safeParse(form.regdNo);
    if (!res.success) {
      setRegdNoError(false);
      setRegdNoErr(res.error.issues[0].message);
    } else {
      setRegdNoError(true);
    }
  };

  const handleSendOTP = async () => {
    const res = SignupSchemaStep1.safeParse({
      name: form.name,
      email: form.email,
      phone: form.phone,
      regdNo: form.regdNo,
    });
    if (!res.success) {
      const emailInValid = res.error.issues.find(
        (issue) => issue.path[0] === "email"
      );
      const nameInValid = res.error.issues.find(
        (issue) => issue.path[0] === "name"
      );
      const phoneInValid = res.error.issues.find(
        (issue) => issue.path[0] === "phone"
      );
      const regdNoInValid = res.error.issues.find(
        (issue) => issue.path[0] === "regdNo"
      );
      if (emailInValid) {
        setEmailError(false);
        setEmailErr(emailInValid.message);
        toast.error(emailInValid.message);
      }
      if (nameInValid) {
        setNameError(false);
        setNameErr(nameInValid.message);
        toast.error(nameInValid.message);
      }
      if (phoneInValid) {
        setPhoneError(false);
        setPhoneErr(phoneInValid.message);
        toast.error(phoneInValid.message);
      }
      if (regdNoInValid) {
        setRegdNoError(false);
        setRegdNoErr(regdNoInValid.message);
        toast.error(regdNoInValid.message);
      }
      return;
    }

    setLoading(true);
    
    try {
      await sendOTP({ email: form.email });
      toast.success("OTP sent successfully! Please check your email.");
      setStep(2);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    // Validate OTP first
    if (!form.otp || !/^\d{4}$/.test(form.otp)) {
      setOtpError(false);
      setOtpErr("Please enter a valid 4-digit OTP");
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    const res = SignupSchemaStep2.safeParse({
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
    
    if (!res.success) {
      const passwordInValid = res.error.issues.find(
        (issue) => issue.path[0] === "password"
      );
      const confirmPasswordInvalid = res.error.issues.find(
        (issue) => issue.path[0] === "confirmPassword"
      );
      
      if (passwordInValid) {
        setPasswordError(false);
        setpassworderr(passwordInValid.message);
        toast.error(passwordInValid.message);
      }
      if (confirmPasswordInvalid) {
        setConfirmPasswordError(false);
        setconfirmpassworderr(confirmPasswordInvalid.message);
        toast.error(confirmPasswordInvalid.message);
      }
      return;
    }

    if (form.password !== form.confirmPassword) {
      setConfirmPasswordError(false);
      setconfirmpassworderr("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    
    try {
      const payload = { ...form };
      const res = await signup(payload);
      
      toast.success("Account created successfully! Redirecting to login...");
      
      // Always redirect to login page after successful signup
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("OTP expired. Please resend!");
      } else if (error.response?.status === 401) {
        toast.error("Invalid OTP. Please check your email.");
      } else {
        const errorMessage = error?.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateOTP = () => {
    if (!form.otp) {
      setOtpError(false);
      setOtpErr("OTP is required");
      return;
    }
    
    if (!/^\d+$/.test(form.otp)) {
      setOtpError(false);
      setOtpErr("OTP should only contain digits");
      return;
    }
    
    if (form.otp.length !== 4) {
      setOtpError(false);
      setOtpErr("OTP should have exactly 4 digits");
      return;
    }
    
    // If all validations pass
    setOtpError(true);
    setOtpErr("");
  }; 

  // --- Styles ---
  const textFieldStyles = (isError: boolean | string) => ({
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(20, 5, 5, 0.7)",
      borderRadius: "2px",
      backdropFilter: "blur(4px)",
      "& fieldset": {
        borderColor:
          isError === false
            ? "#991b1b"
            : isError === true
            ? "#1b998b"
            : "#44403c",
        borderWidth: "1px",
        boxShadow:
          isError === false
            ? "0px 0px 10px rgba(220,38,38,0.3)"
            : isError === true
            ? "0px 0px 10px #3f7f6b"
            : "",
        transition: "all 0.3s ease",
      },
      "&:hover fieldset": {
        borderColor: "#b91c1c",
        boxShadow: "none",
        transition: "all 0.3s ease",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#dc2626",
        boxShadow: "0 0 10px rgba(220, 38, 38, 0.3)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#a8a29e",
      fontFamily: "var(--font-noto)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a8a29e",
      fontFamily: "var(--font-noto)",
    },
    "& .MuiOutlinedInput-input": { color: "#f5f5f4" },
  });

  // Styles for Native Select to match TextField
  const selectStyles =
    "w-full bg-[#140505]/70 text-[#f5f5f4] border border-[#44403c] rounded-sm px-3 py-3.5 focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] outline-none appearance-none font-noto cursor-pointer transition-colors hover:border-[#b91c1c]";

  return (
    <div
      className={`min-h-screen relative flex justify-center items-center px-4 py-10 overflow-hidden ${noto.variable} ${zen.variable} ${cinzel.variable}`}
    >
      {/* --- CSS for Glitch --- */}
      <style jsx global>{`
        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          10% {
            transform: skew(3deg);
          }
          20% {
            transform: skew(-3deg);
          }
          30% {
            transform: skew(2deg);
          }
          40% {
            transform: skew(-1deg);
          }
          50% {
            transform: skew(0deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
        @keyframes glitch-text-switch {
          0%,
          49% {
            content: attr(data-text-eng);
            color: #fff7ed;
          }
          50%,
          65% {
            content: attr(data-text-jp);
            color: #fdba74;
            letter-spacing: 0.1em;
          }
          66%,
          100% {
            content: attr(data-text-eng);
            color: #fff7ed;
          }
        }
        @keyframes glitch-flash {
          0% {
            opacity: 1;
            transform: translate(0);
          }
          1% {
            opacity: 0.8;
            transform: translate(2px, -2px);
          }
          2% {
            opacity: 1;
            transform: translate(0);
          }
          50% {
            opacity: 1;
            transform: translate(0);
          }
          51% {
            opacity: 0.8;
            transform: translate(-3px, 1px);
          }
          52% {
            opacity: 1;
            transform: translate(0);
          }
          100% {
            opacity: 1;
            transform: translate(0);
          }
        }
        .glitch-btn {
          position: relative;
          overflow: hidden;
        }
        .glitch-btn .glitch-content::before {
          content: attr(data-text-eng);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: glitch-text-switch 4s infinite step-end,
            glitch-skew 4s infinite ease-in-out;
        }
        .glitch-btn::after {
          content: attr(data-text-eng);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          color: cyan;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
          animation: glitch-flash 4s infinite steps(1);
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, 0);
        }
        .glitch-btn::before {
          content: attr(data-text-eng);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          color: red;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -2;
          animation: glitch-flash 4s infinite steps(1) reverse;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(2px, 0);
        }
        /* Custom Select Arrow */
        .select-wrapper {
          position: relative;
        }
        .select-wrapper svg {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #a8a29e;
        }
      `}</style>

      {/* --- BACKGROUND & OVERLAYS --- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2a0a0a]/90 via-[#450a0a]/70 to-black/95 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* --- DECORATIVE KANJI --- */}
      <div className="absolute top-8 left-8 text-white/10 text-9xl font-zen writing-vertical-rl pointer-events-none select-none z-0">
        登録
      </div>
      <div className="absolute bottom-8 right-8 text-red-900/20 text-9xl font-zen writing-vertical-rl pointer-events-none select-none z-0">
        名誉
      </div>

      {/* --- LANTERNS --- */}
      {mounted && (
        <>
          <motion.div
            variants={lanternSway}
            animate="animate"
            className="absolute left-[2%] lg:left-[5%] top-0 z-20 hidden sm:block origin-top"
          >
            <LanternSVG />
          </motion.div>
          <motion.div
            variants={lanternSway}
            animate="animate"
            className="absolute right-[2%] lg:right-[5%] top-0 z-20 hidden sm:block origin-top"
          >
            <LanternSVG />
          </motion.div>
        </>
      )}

      {/* --- MAIN CARD --- */}
      {mounted ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl relative z-10"
        >
          {/* Torii Gate Top Bar */}
          <div className="w-[108%] -ml-[4%] h-5 bg-[#7f1d1d] border border-[#450a0a] shadow-lg relative z-20 mb-[-12px] mx-auto rounded-sm flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#991b1b]/50"></div>
          </div>

          <div className="bg-[#1c0505]/90 backdrop-blur-md border-x border-b border-[#7f1d1d]/30 shadow-[0_0_60px_rgba(0,0,0,1)] p-8 md:p-10 relative">
            {/* Header & Stepper */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-4 mb-4">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-sm border-2 transform rotate-45 text-xs font-bold font-zen transition-all duration-300
                            ${
                              step >= s
                                ? "bg-[#7f1d1d] border-[#ef4444] text-white shadow-[0_0_10px_#ef4444]"
                                : "bg-transparent border-[#44403c] text-[#57534e]"
                            }`}
                    >
                      <span className="-rotate-45">{s}</span>
                    </div>
                    {s === 1 && (
                      <div className="w-10 h-[1px] bg-[#44403c]"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h2 className="text-4xl font-zen text-[#e5e5e5] drop-shadow-md tracking-wider">
                  SIGNUP
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-[1px] w-6 bg-red-800"></div>
                  <p className="text-[#dc2626] font-noto text-xs font-bold uppercase tracking-[0.3em]">
                    アカウント作成
                  </p>
                  <div className="h-[1px] w-6 bg-red-800"></div>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  {/* Divider Sword */}
                  <div className="relative flex items-center justify-center py-1 mb-2">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent"></div>
                    <Sword
                      size={20}
                      className="text-[#7f1d1d] rotate-45 opacity-80 mx-3"
                    />
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent"></div>
                  </div>

                  {/* Name */}
                  <div className="relative">
                    <TextField
                      label="Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      sx={textFieldStyles(nameError)}
                      onBlur={validateName}
                    />
                    <AnimatePresence>
                      {!nameError && nameErr && (
                        <motion.p
                          initial={{ opacity: 0, height:0 }}
                          animate={{ opacity: 1 , height:"auto"}}
                          exit={{ opacity: 0 , height:0}}
                          className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1"
                        >
                          {nameErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <TextField
                      label="Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      sx={textFieldStyles(emailError)}
                      onBlur={validateEmail}
                    />
                    <AnimatePresence>
                      {!emailError && emailErr && (
                        <motion.p
                          initial={{height:0, opacity: 0 }}
                          animate={{height:"auto", opacity: 1 }}
                          exit={{height:0, opacity: 0 }}
                          className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1"
                        >
                          {emailErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <TextField
                      label="Phone"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      sx={textFieldStyles(phoneError)}
                      onBlur={validatePhone}
                    />
                    <AnimatePresence>
                      {!phoneError && phoneErr && (
                        <motion.p
                          initial={{ opacity: 0, height:0 }}
                          animate={{ opacity: 1, height:"auto" }}
                          exit={{ opacity: 0,height:0 }}
                          className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1"
                        >
                          {phoneErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Registration Number */}
                  <div className="relative">
                    <TextField
                      label="Registration Number"
                      value={form.regdNo}
                      onChange={(e) =>
                        setForm({ ...form, regdNo: e.target.value })
                      }
                      sx={textFieldStyles(regdNoError)}
                      onBlur={validateRegdNo}
                      placeholder="Enter 10-digit registration number"
                    />
                    <AnimatePresence>
                      {!regdNoError && regdNoErr && (
                        <motion.p
                          initial={{ opacity: 0, height:0 }}
                          animate={{ opacity: 1, height:"auto" }}
                          exit={{ opacity: 0,height:0 }}
                          className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1"
                        >
                          {regdNoErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dropdowns - Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-cinzel text-[#a8a29e] mb-1">
                        Graduation Year
                      </label>
                      <div className="select-wrapper">
                        <select
                          value={form.gradYear}
                          onChange={(e) =>
                            setForm({ ...form, gradYear: e.target.value })
                          }
                          className={selectStyles}
                        >
                          {YEARS.map((y) => (
                            <option
                              key={y.value}
                              value={y.value}
                              className="bg-[#1c0505] text-[#d6d3d1]"
                            >
                              {y.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-cinzel text-[#a8a29e] mb-1">
                        Branch
                      </label>
                      <div className="select-wrapper">
                        <select
                          value={form.branch}
                          onChange={(e) =>
                            setForm({ ...form, branch: e.target.value })
                          }
                          className={selectStyles}
                        >
                          {BRANCHES.map((b) => (
                            <option
                              key={b.value}
                              value={b.value}
                              className="bg-[#1c0505] text-[#d6d3d1]"
                            >
                              {b.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 md:gap-[3px] pt-2">
                    <p className="text-sm text-[#78716c] font-cinzel">
                      Already In?
                    </p>
                    <Link
                      href="/login"
                      className="text-sm text-[#dc2626] hover:text-[#ef4444] hover:underline font-cinzel font-bold"
                    >
                      Login
                    </Link>
                  </div>

                  {/* Send OTP Button (Glitch) */}
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="w-full h-12 mt-4 bg-gradient-to-r from-orange-900 to-red-900 hover:from-orange-800 hover:to-red-800 text-[#fff7ed] border border-orange-700/50 font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] disabled:opacity-50 disabled:cursor-not-allowed glitch-btn group"
                    data-text-eng={loading ? "SENDING..." : "SEND OTP"}
                  >
                    <span className="invisible font-cinzel">
                      {loading ? "SENDING..." : "SEND OTP"}
                    </span>
                    <span
                      className="glitch-content absolute inset-0 flex items-center justify-center font-cinzel text-sm"
                      data-text-eng={loading ? "SENDING..." : "SEND OTP"}
                      data-text-jp={loading ? "送信中..." : "コードを送信"}
                    ></span>
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 mt-4"
                >
                  {/* OTP Input - Custom Dark Style */}
                  <div className="relative">
                    <TextField
                      label="Enter OTP"
                      id="otp"
                      placeholder="****"
                      value={form.otp}
                      onChange={(e) =>
                        setForm({ ...form, otp: e.target.value })
                      }
                      autoComplete="otp"
                      sx={textFieldStyles(otpError)}
                      onBlur={validateOTP}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <AnimatePresence>
                      {(!otpError && otpErr) && (
                        <motion.p 
                          initial={{height:0, opacity:0}} 
                          animate={{height:"auto", opacity:1}} 
                          exit={{height:0, opacity:0}} 
                          className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1"
                        >
                          {otpErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{
                                  color: "#78716c",
                                  "&:hover": { color: "#dc2626" },
                                }}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={textFieldStyles(passwordError)}
                      onBlur={validatePassword}
                    />
                    <AnimatePresence>
                      {!passwordError && passwordErr && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-xs mt-1 font-noto font-bold pl-1"
                        >
                          {passwordErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <TextField
                      label="Confirm Password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                sx={{
                                  color: "#78716c",
                                  "&:hover": { color: "#dc2626" },
                                }}
                              >
                                {showCurrentPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={textFieldStyles(confirmpasswordError)}
                      onBlur={validateConfirmPassword}
                    />
                    <AnimatePresence>
                      {!confirmpasswordError && confirmpasswordErr && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-xs mt-1 font-noto font-bold pl-1"
                        >
                          {confirmpasswordErr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Buttons Row */}
                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-[#44403c] rounded-sm text-sm font-cinzel text-[#a8a29e] hover:border-[#d6d3d1] hover:text-[#d6d3d1] transition-colors"
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      onClick={handleSignup}
                      disabled={loading}
                      className="flex-[2] bg-[#dc2626] hover:bg-[#b91c1c] text-white border border-[#991b1b] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed glitch-btn"
                      data-text-eng={loading ? "JOINING..." : "REGISTER"}
                    >
                      <span className="invisible font-cinzel text-sm">
                        {loading ? "JOINING..." : "REGISTER"}
                      </span>
                      <span
                        className="glitch-content absolute inset-0 flex items-center justify-center font-cinzel text-sm"
                        data-text-eng={loading ? "JOINING..." : "REGISTER"}
                        data-text-jp={loading ? "参加中..." : "完了"}
                      ></span>
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Bottom "Feet" */}
          <div className="flex justify-between w-[90%] mx-auto">
            <div className="h-6 w-3 bg-[#450a0a] opacity-80" />
            <div className="h-6 w-3 bg-[#450a0a] opacity-80" />
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-xl relative z-10">
          <div className="bg-[#1c0505]/90 backdrop-blur-md border border-[#7f1d1d]/30 shadow-[0_0_60px_rgba(0,0,0,1)] p-8 md:p-10 relative">
            <div className="text-center text-white font-cinzel">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
}
