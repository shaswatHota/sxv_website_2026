"use client";

import { Noto_Serif_JP, Zen_Tokyo_Zoo, Cinzel } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sword } from "lucide-react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginSchema } from "@/Schemas/loginSchema";
import SignupSchemaStep2 from "@/Schemas/signupSchemaStep2";
import { verifyOTP, verifyEmail, forgotPassword } from "@/services/auth";
import { DialogBox } from "@/components/dialogBox";

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

const LanternSVG = () => (
  <svg
    width="80"
    height="140"
    viewBox="0 0 80 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_5px_15px_rgba(234,88,12,0.4)]"
  >
    {/* Rope */}
    <line x1="40" y1="0" x2="40" y2="20" stroke="#431407" strokeWidth="4" />
    {/* Top Cap */}
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
    {/* Main Body (Paper glow) */}
    <rect
      x="15"
      y="40"
      width="50"
      height="70"
      fill="url(#lanternGlow)"
      stroke="#7c2d12"
      strokeWidth="3"
    />
    {/* Horizontal Ribs */}
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
    {/* Kanji on Lantern (Light) */}
    <text
      x="40"
      y="80"
      textAnchor="middle"
      fill="#431407"
      fontSize="24"
      fontFamily="var(--font-zen)"
      opacity="0.8"
    >
      明
    </text>
    {/* Bottom Base */}
    <rect
      x="20"
      y="110"
      width="40"
      height="15"
      fill="#431407"
      stroke="#7c2d12"
      strokeWidth="2"
    />
    {/* Tassel connector */}
    <circle cx="40" cy="130" r="5" fill="#ea580c" />

    {/* Gradients */}
    <defs>
      <radialGradient
        id="lanternGlow"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(40 75) rotate(90) scale(35 25)"
      >
        <stop stopColor="#fbbf24" /> {/* Bright yellow center */}
        <stop offset="0.8" stopColor="#ea580c" /> {/* Orange edge */}
        <stop offset="1" stopColor="#9a3412" /> {/* Dark orange border */}
      </radialGradient>
    </defs>
  </svg>
);

const lanternSway: Variants = {
  animate: {
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
    },
  },
};

const scrollContentVariants: Variants = {
  closed: {
    scaleY: 0,
    opacity: 0,
  },
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

const scrollMaskVariants: Variants = {
  closed: {
    height: 0,
  },
  open: {
    height: "auto",
    transition: {
      duration: 1,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

export default function ForgotPage() {
  const [mounted, setMounted] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<boolean | string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [otpConfirmation, setOtpConfirmation] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<boolean | string>("");
  const [otpErr, setOtpErr] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<boolean | string>("");
  const [passwordErr, setpassworderr] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState<
    boolean | string
  >("");
  const [confirmpasswordErr, setconfirmpassworderr] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [japaneseMessage, setJapaneseMessage] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loadedPage = () => setMounted(true);
    loadedPage();
  }, []);

  if (!mounted) {
    return (
      <div
        className={`min-w-screen min-h-screen flex justify-center items-center ${noto.variable} ${zen.variable} ${cinzel.variable}`}
      >
        <div className="text-white font-[var(--font-cinzel)]">Loading...</div>
      </div>
    );
  }

  const validateEmail = () => {
    const res = LoginSchema.shape.email.safeParse(email);
    if (!res.success) {
      setEmailError(false);
      setEmailErr(res.error.issues[0].message);
    } else {
      setEmailError(true);
    }
  };

  const validateOtp = () => {
    if (!otp) {
      setOtpError(false);
      setOtpErr("OTP is required");
      return "invalid";
    } else {
      if (!/^\d+$/.test(otp)) {
        setOtpError(false);
        setOtpErr("OTP should only contain digits");
        return "invalid";
      }
      if (otp.toString().length !== 4) {
        setOtpError(false);
        setOtpErr("OTP should have exactly 4 digits");
        return "invalid";
      }
    }
    if (/^\d{4}$/.test(otp)) {
      setOtpError(true);
      setOtpErr("");
      return "validated";
    }
  };

  const MotionDialogBox = motion.create(DialogBox);

  const validatePassword = () => {
    const res = SignupSchemaStep2.shape.password.safeParse(password);
    if (!res.success) {
      setPasswordError(false);
      setpassworderr(res.error.issues[0].message);
    } else {
      setPasswordError(true);
    }
  };

  const validateConfirmPassword = () => {
    const res =
      SignupSchemaStep2.shape.confirmPassword.safeParse(confirmPassword);
    if (!res.success) {
      setConfirmPasswordError(false);
      setconfirmpassworderr(res.error.issues[0].message);
    } else {
      setConfirmPasswordError(true);
    }
    if (password != confirmPassword) {
      setConfirmPasswordError(false);
      setconfirmpassworderr("Passwords do not match.");
    }
  };

  const backButton = () => {
    if (passwordConfirmation) {
      setPasswordConfirmation(false);
      setOtpConfirmation(true);
      setStep(2);
    } else if (otpConfirmation) {
      setEmailConfirmation(true);
      setOtpConfirmation(false);
      setStep(1);
    }
  };

  const emailHandler = async () => {
    const res = LoginSchema.shape.email.safeParse(email);
    if (!res.success) {
      setEmailError(false);
      setEmailErr(res.error.issues[0].message);
      return;
    } else {
      setLoading(true);
      try {
        const res = await verifyEmail({ email: email });
        if (res.status === 200) {
          setDisplay(true);
          setMessage(
            "Email Confirmation successful! Check your Email for OTP."
          );
          setJapaneseMessage("認証完了(SYSTEM)");
          setEmailError(true);
          setEmailConfirmation(false);
          setOtpConfirmation(true);
          setStep(2);
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          setDisplay(true);
          setMessage("Your Email is not registered.");
          setJapaneseMessage("されません。(SYSTEM)");
        } else {
          setDisplay(true);
          setMessage("Unknown error occurred, Please try again!");
          setJapaneseMessage("度お試しください(SYSTEM)");
        }
        console.log(err.message);
      } finally {
        setLoading(false);
        setTimeout(() => setDisplay(false), 2000);
      }
    }
  };

  const otpHandler = async () => {
    const response = validateOtp();
    if (response === "invalid") return;
    else if (response === "validated") {
      setLoading(true);
      try {
        const res = await verifyOTP({ email: email, otp: otp });
        if (res.status === 200) {
          setDisplay(true);
          setMessage("OTP verified!");
          setJapaneseMessage("了しました！(SYSTEM)");
          setOtpError(true);
          setOtpConfirmation(false);
          setPasswordConfirmation(true);
          setStep(3);
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          setDisplay(true);
          setMessage("OTP expired.Enter email and resend!");
          setJapaneseMessage("て再送信してくだ(SYSTEM)");
        } else if (err.response?.status === 401) {
          setDisplay(true);
          setMessage("Incorrect OTP entered , Please check email.");
          setJapaneseMessage("をご確認くだ(SYSTEM)");
        } else {
          setDisplay(true);
          setMessage("Unknown error occurred , Please try again!");
          setJapaneseMessage("お試しください。(SYSTEM)");
        }
      } finally {
        setLoading(false);
        setTimeout(()=>setDisplay(false),2000);
      }
    }
  };

  const passwordHandler = async () => {
    const res = SignupSchemaStep2.safeParse({
      password: password,
      confirmPassword: confirmPassword,
    });
    if (!res.success) {
      const passwordInvalid = res.error.issues.find(
        (issue) => issue.path[0] === "password"
      );
      const confirmPasswordInvalid = res.error.issues.find(
        (issue) => issue.path[0] === "confirmPassword"
      );
      if (passwordInvalid) {
        setPasswordError(false);
        setpassworderr(passwordInvalid.message);
      }
      if (confirmPasswordInvalid) {
        setConfirmPasswordError(false);
        setconfirmpassworderr(confirmPasswordInvalid.message);
      }
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(false);
      setconfirmpassworderr("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await forgotPassword({ email: email });
      if (res.status === 200) {
        setDisplay(true);
        setMessage("Password successfully changed!");
        setJapaneseMessage("に変更されました！(SYSTEM)");
        setTimeout(() => router.replace("/login"), 2100);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setDisplay(true);
        setMessage("Your Email is not registered.");
        setJapaneseMessage("録されていません。(SYSTEM)");
      } else if (err.response?.status === 401) {
        setDisplay(true);
        setMessage(
          "Your session is invalid or has expired. Please sign up again."
        );
        setJapaneseMessage("ンアップしてください。(SYSTEM)");
      } else {
        setDisplay(true);
        setMessage("Unknown error occurred , Please try again!");
        setJapaneseMessage("う一度お試しください。(SYSTEM)");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setDisplay(false), 2000);
    }
  };

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
            ? " 0px 0px 10px rgba(220,38,38,0.3)"
            : isError === true
            ? "0px 0px 8px #3f7f6b"
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
      fontFamily: "var(--font-cinzel)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a8a29e",
      fontFamily: "var(--font-cinzel)",
    },
    "& .MuiOutlinedInput-input": { color: "#f5f5f4" },
  });

  return (
    <>
      <div className="min-w-screen min-h-screen relative overflow-hidden flex flex-col justify-center items-center">
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
        <div
          className="
  absolute
  top-[30px] left-50
  md:top-10 md:left-10
  z-0
  pointer-events-none
  select-none
  max-md:text-6xl text-9xl
  writing-vertical-rl
  text-white/10
  font-[var(--font-zen)]
"
        >
          城
        </div>

        <div
          className="
    absolute
    bottom-[40px]
    left-1/2 -translate-x-1/2
    md:bottom-10
    md:left-auto md:right-10 md:translate-x-0
    z-0
    max-md:text-6xl text-9xl
    font-[var(--font-zen)]
    text-red-900/30 md:text-red-900/20
    writing-vertical-rl
    pointer-events-none
    select-none
  "
        >
          武士
        </div>
        <AnimatePresence>
          {display && (
            <motion.div className="w-full z-30 flex justify-center fixed top-[110px] md:top-[128px]" initial={{x:800}} animate={{x:0}} exit={{x:800}} transition={{ease:[0.4,0,1,1]}}>
              <MotionDialogBox
                text={message}
                japanese={japaneseMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          variants={lanternSway}
          animate="animate"
          className="absolute left-[2%] lg:left-[10%] top-0 z-20  sm:block origin-top"
        >
          <LanternSVG />
        </motion.div>
        <motion.div
          variants={lanternSway}
          animate="animate"
          className="absolute right-[2%] lg:right-[10%] top-0 z-20  sm:block origin-top"
        >
          <LanternSVG />
        </motion.div>
        <div className="absolute left-0 top-[150px] flex justify-center w-full h-fit">
          <div className="w-[95%] md:w-[56%] h-5 bg-[#7f1d1d] border border-[#450a0a] shadow-lg relative z-20 mb-[-12px] rounded-sm flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#991b1b]/50"></div>
          </div>
        </div>
        <div className="absolute top-[170px] flex flex-col items-center justify-center w-[95%] md:w-[56%] h-fit">
          <motion.div
            variants={scrollMaskVariants}
            initial="closed"
            animate="open"
            className="w-[92%] md:w-[81%] overflow-hidden"
          >
            <motion.div
              variants={scrollContentVariants}
              initial="hidden"
              animate="visible"
              className="w-full bg-[#1c0505]/85 backdrop-blur-sm border-x border-b border-[#7f1d1d]/30 shadow-[0_0_60px_rgba(0,0,0,1)] p-4 md:p-12 relative cursor-default"
            >
              <div className="flex justify-center items-center gap-1 w-full h-fit mb-1">
                <div
                  className={`w-8 h-8 text-center rounded-sm border-2 ${
                    step >= 1
                      ? "border-[#ef4444] text-white shadow-[0_0_10px_#ef4444] bg-[#7f1d1d]"
                      : "border-[#44403c] bg-transparent text-[#57534e]"
                  } text-xs flex justify-center items-center transform rotate-45 transition duration-300 font-bold font-zen`}
                >
                  <span className="transform -rotate-45">{1}</span>
                </div>
                <div className="w-10 h-[1px] bg-[#44403c]"></div>
                <div
                  className={`w-8 h-8 text-center rounded-sm border-2 ${
                    step >= 2
                      ? "border-[#ef4444] text-white shadow-[0_0_10px_#ef4444] bg-[#7f1d1d]"
                      : "border-[#44403c] bg-transparent text-[#57534e]"
                  } transform rotate-45 text-xs flex justify-center items-center transition duration-300 font-bold font-zen`}
                >
                  <span className="transform -rotate-45">{2}</span>
                </div>
                <div className="w-10 h-[1px] bg-[#44403c]"></div>
                <div
                  className={`w-8 h-8 text-center rounded-sm border-2 ${
                    step >= 3
                      ? "border-[#ef4444] text-white shadow-[0_0_10px_#ef4444] bg-[#7f1d1d]"
                      : "border-[#44403c] bg-transparent text-[#57534e]"
                  } flex justify-center items-center text-xs transform rotate-45 transition duration-300 font-bold font-zen`}
                >
                  <span className="transform -rotate-45">{3}</span>
                </div>
              </div>
              <div className="text-center mt-6 mb-10">
                <h2 className="md:text-xl text-md font-noto font-bold text-[#e5e5e5] mb-2 tracking-widest drop-shadow-md">
                  FORGOT PASSWORD?
                </h2>
                <div className="flex items-center justify-center gap-1">
                  <div className="h-[1px] w-5 md:w-8 bg-red-800"></div>
                  <p className="text-[#dc2626] font-noto tracking-[0.3em] text-xs font-bold uppercase">
                    パスワドを忘れた
                  </p>
                  <div className="h-[1px] w-5 md:w-8 bg-red-800"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="relative flex items-center justify-center">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent"></div>
                  <div className="mx-2 text-[#7f1d1d] rotate-45 transform opacity-80">
                    <Sword size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent"></div>
                </div>
                <div className="space-y-6">
                  <AnimatePresence>
                    {emailConfirmation && (
                      <motion.div
                        className="relative"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <TextField
                          label="Email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          sx={textFieldStyles(emailError)}
                          onBlur={validateEmail}
                        />

                        <AnimatePresence>
                          {!emailError && emailErr && (
                            <motion.p
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className={`text-red-500 text-xs mt-1 font-${cinzel.variable} font-bold tracking-widest pl-1`}
                            >
                              {emailErr}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {otpConfirmation && (
                      <motion.div
                        className="relative"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <TextField
                          label="OTP"
                          id="otp"
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value);
                          }}
                          autoComplete="1234"
                          sx={textFieldStyles(otpError)}
                          onBlur={validateOtp}
                        />
                        <AnimatePresence>
                          {!otpError && otpErr && (
                            <motion.p
                              initial={{ opacity: 0, y: -15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              className={`text-red-500 text-xs mt-1 font-${cinzel.variable} font-bold tracking-widest pl-1`}
                            >
                              {otpErr}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {passwordConfirmation && (
                      <>
                        <motion.div
                          className="relative"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <TextField
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
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
                            }}
                            sx={textFieldStyles(passwordError)}
                            onBlur={validatePassword}
                          />
                          <AnimatePresence>
                            {!passwordError && passwordErr && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`text-red-500 text-xs mt-1 font-${cinzel.variable} font-bold pl-1`}
                              >
                                {passwordErr}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <motion.div
                          className="relative"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <TextField
                            label="Confirm New Password"
                            type={showCurrentPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowCurrentPassword(
                                        !showCurrentPassword
                                      )
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
                            }}
                            sx={textFieldStyles(confirmpasswordError)}
                            onBlur={validateConfirmPassword}
                          />
                          <AnimatePresence>
                            {!confirmpasswordError && confirmpasswordErr && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-red-500 text-xs mt-1 font-cinzel tracking-widest font-bold pl-1"
                              >
                                {confirmpasswordErr}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex md:gap-4 gap-2 pt-2">
                  <button
                    type="button"
                    className={`flex-1 py-3 border ${
                      emailConfirmation
                        ? "border-[#57534e]"
                        : "border-[#44403c]"
                    } rounded-sm text-sm font-cinzel text-[#a8a29e] ${
                      emailConfirmation
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      emailConfirmation ? "text-[#78716c]" : "text-[#a8a29e]"
                    } ${!emailConfirmation ? "hover:border-[#d6d3d1]" : ""} ${
                      !emailConfirmation ? "hover:text-[#d6d3d1]" : ""
                    } transition-colors`}
                    disabled={emailConfirmation}
                    onClick={backButton}
                  >
                    BACK
                  </button>
                  <AnimatePresence>
                    {emailConfirmation && (
                      <motion.button
                        type="button"
                        className={`relative flex-[2]  ${
                          loading
                            ? "bg-[#3a0d0d] hover:bg-[#3a0d0d]"
                            : "bg-[#dc2626] hover:bg-[#b91c1c]"
                        }   text-white border border-[#991b1b] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glitch-btn`}
                        disabled={loading}
                        onClick={emailHandler}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        data-text-eng={loading ? "SENDING..." : "SEND OTP"}
                        data-text-jp={
                          loading ? "送信中..." : "認証コードを送信"
                        }
                      >
                        <span className="invisible font-cinzel text-sm">
                          {loading ? "SENDING..." : "SEND OTP"}
                        </span>
                        <span
                          className="glitch-content absolute inset-0 flex items-center justify-center font-cinzel text-sm"
                          data-text-eng={loading ? "SENDING..." : "SEND OTP"}
                          data-text-jp={
                            loading ? "送信中..." : "認証コードを送信"
                          }
                        ></span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {otpConfirmation && (
                      <motion.button
                        type="button"
                        className={`relative flex-[2] ${
                          loading
                            ? "bg-[#3a0d0d] hover:bg-[#3a0d0d]"
                            : "bg-[#dc2626] hover:bg-[#b91c1c]"
                        }  text-white border border-[#991b1b] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glitch-btn`}
                        disabled={loading}
                        onClick={otpHandler}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        data-text-eng={loading ? "VERIFYING" : "VERIFY"}
                        data-text-jp={loading ? "認証コードを確認" : "確認中"}
                      >
                        <span className="invisible font-cinzel text-sm">
                          {loading ? "VERIFYING" : "VERIFY"}
                        </span>
                        <span
                          className="glitch-content absolute inset-0 flex items-center justify-center font-cinzel text-sm"
                          data-text-eng={loading ? "VERIFYING" : "VERIFY"}
                          data-text-jp={loading ? "認証コードを確認" : "確認中"}
                        ></span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {passwordConfirmation && (
                      <motion.button
                        type="button"
                        className={`relative flex-[2] ${
                          loading
                            ? "bg-[#3a0d0d] hover:bg-[#3a0d0d]"
                            : "bg-[#dc2626] hover:bg-[#b91c1c]"
                        }  text-white border border-[#991b1b] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glitch-btn`}
                        disabled={loading}
                        onClick={passwordHandler}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        data-text-eng={loading ? "CHANGING" : "RESET"}
                        data-text-jp={
                          loading ? "パスワードを再設定" : "再設定中"
                        }
                      >
                        <span className="invisible font-cinzel text-sm">
                          {loading ? "CHANGING" : "RESET"}
                        </span>
                        <span
                          className="glitch-content absolute inset-0 flex items-center justify-center font-cinzel text-sm"
                          data-text-eng={loading ? "CHANGING" : "RESET"}
                          data-text-jp={
                            loading ? "パスワードを再設定" : "再設定中"
                          }
                        ></span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <div className="w-[95%] md:w-[56%] h-fit flex justify-around mx-auto">
            <div className="h-6 w-3 bg-[#450a0a] opacity-80"></div>
            <div className="h-6 w-3 bg-[#450a0a] opacity-80"></div>
          </div>
        </div>
      </div>
    </>
  );
}
