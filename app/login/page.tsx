"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
// Removed GoogleSignInButton import
import { login } from "@/services/auth"; // Removed googleSignIn import
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Noto_Serif_JP,
  Zen_Tokyo_Zoo,
  Cinzel,
} from "next/font/google";
import { LoginSchema } from "@/Schemas/loginSchema";
import { motion, AnimatePresence } from "framer-motion";
import { Sword } from "lucide-react";

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
  weight: ["500", "700", "900"],
  variable: "--font-cinzel",
});

// --- SVG Component for Lantern ---
const LanternSVG = () => (
  <svg width="80" height="140" viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_5px_15px_rgba(234,88,12,0.4)]">
    {/* Rope */}
    <line x1="40" y1="0" x2="40" y2="20" stroke="#431407" strokeWidth="4" />
    {/* Top Cap */}
    <path d="M10 30L40 20L70 30" stroke="#7c2d12" strokeWidth="4" fill="#431407" />
    <rect x="15" y="30" width="50" height="10" fill="#431407" stroke="#7c2d12" strokeWidth="2"/>
    {/* Main Body (Paper glow) */}
    <rect x="15" y="40" width="50" height="70" fill="url(#lanternGlow)" stroke="#7c2d12" strokeWidth="3"/>
    {/* Horizontal Ribs */}
    <line x1="15" y1="58" x2="65" y2="58" stroke="#7c2d12" strokeWidth="2" opacity="0.7"/>
    <line x1="15" y1="75" x2="65" y2="75" stroke="#7c2d12" strokeWidth="2" opacity="0.7"/>
    <line x1="15" y1="92" x2="65" y2="92" stroke="#7c2d12" strokeWidth="2" opacity="0.7"/>
    {/* Kanji on Lantern (Light) */}
    <text x="40" y="80" textAnchor="middle" fill="#431407" fontSize="24" fontFamily="var(--font-zen)" opacity="0.8">明</text>
    {/* Bottom Base */}
    <rect x="20" y="110" width="40" height="15" fill="#431407" stroke="#7c2d12" strokeWidth="2"/>
    {/* Tassel connector */}
    <circle cx="40" cy="130" r="5" fill="#ea580c" />
    
    {/* Gradients */}
    <defs>
      <radialGradient id="lanternGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 75) rotate(90) scale(35 25)">
        <stop stopColor="#fbbf24" /> {/* Bright yellow center */}
        <stop offset="0.8" stopColor="#ea580c" /> {/* Orange edge */}
        <stop offset="1" stopColor="#9a3412" /> {/* Dark orange border */}
      </radialGradient>
    </defs>
  </svg>
);

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Subtle swaying for lanterns
const lanternSway = {
  animate: {
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
    },
  },
};

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<boolean | string>("");
  const [passwordError, setPasswordError] = useState<boolean | string>("");
  const [passwordErr, setpassworderr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [error, setError] = useState("");

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`min-h-screen flex justify-center items-center bg-black ${noto.variable} ${zen.variable} ${cinzel.variable}`}>
        <div className="text-white font-cinzel">Loading...</div>
      </div>
    );
  }

  const validatePassword = () => {
    const res = LoginSchema.shape.password.safeParse(password);
    if (!res.success) {
      setPasswordError(false);
      setpassworderr(res.error.issues[0].message);
    } else {
      setPasswordError(true);
    }
  };

  const validateEmail = () => {
    const res = LoginSchema.shape.email.safeParse(email);
    if (!res.success) {
      setEmailError(false);
      setEmailErr(res.error.issues[0].message);
    } else {
      setEmailError(true);
    }
  };

  const handleLogin = async () => {
    const res = LoginSchema.safeParse({ email, password });
    if (!res.success) {
      // ... (validation logic remains the same)
      const emailInlValid = res.error.issues.find((issue) => issue.path[0] === "email");
      const passwordInValid = res.error.issues.find((issue) => issue.path[0] === "password");
      if (emailInlValid) { setEmailError(false); setEmailErr(emailInlValid.message); }
      if (passwordInValid) { setPasswordError(false); setpassworderr(passwordInValid.message); }
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err: any) {
      setError((err.response?.data?.message) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Styles for Inputs ---
  const textFieldStyles = (isError: boolean | string) => ({
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(20, 5, 5, 0.7)",
      borderRadius: "2px",
      backdropFilter: "blur(4px)",
      "& fieldset": {
        borderColor: isError === false ? "#991b1b" : isError === true ? "#059669" : "#44403c",
        borderWidth: "1px",
        transition: "all 0.3s ease",
      },
      "&:hover fieldset": {
        borderColor: "#b91c1c",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#dc2626",
        boxShadow: "0 0 10px rgba(220, 38, 38, 0.3)",
      },
    },
    "& .MuiInputLabel-root": { color: "#a8a29e", fontFamily: "var(--font-noto)" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root": { color: "#dc2626" },
    "& .MuiOutlinedInput-input": { color: "#f5f5f4" },
  });

  return (
    // Added CSS for Glitch Effect within the component scope
    <div className={`min-h-screen relative flex justify-center items-center px-4 overflow-hidden ${noto.variable} ${zen.variable} ${cinzel.variable}`}>
        <style jsx global>{`
            @keyframes glitch-skew {
                0% { transform: skew(0deg); }
                10% { transform: skew(3deg); }
                20% { transform: skew(-3deg); }
                30% { transform: skew(2deg); }
                40% { transform: skew(-1deg); }
                50% { transform: skew(0deg); }
                100% { transform: skew(0deg); }
            }

            @keyframes glitch-text-switch {
                0%, 49% { content: attr(data-text-eng); color: #fff7ed; }
                50%, 65% { content: attr(data-text-jp); color: #fdba74; letter-spacing: 0.1em; }
                66%, 100% { content: attr(data-text-eng); color: #fff7ed; }
            }

            @keyframes glitch-flash {
                0% { opacity: 1; transform: translate(0); }
                1% { opacity: 0.8; transform: translate(2px, -2px); }
                2% { opacity: 1; transform: translate(0); }
                50% { opacity: 1; transform: translate(0); }
                51% { opacity: 0.8; transform: translate(-3px, 1px); }
                52% { opacity: 1; transform: translate(0); }
                100% { opacity: 1; transform: translate(0); }
            }

            .glitch-btn {
                position: relative;
                overflow: hidden;
            }

            /* The base English text */
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
                /* The main animation loop */
                animation: glitch-text-switch 4s infinite step-end, glitch-skew 4s infinite ease-in-out;
            }

            /* The cyan color split glitch layer */
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

            /* The red color split glitch layer */
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

        `}</style>
      
      {/* --- STATIC BACKGROUND IMAGE & OVERLAYS --- */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2a0a0a]/90 via-[#450a0a]/70 to-black/95 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* --- DECORATIVE ELEMENTS --- */}
      <div className="absolute top-8 left-8 text-white/10 text-9xl font-zen writing-vertical-rl pointer-events-none select-none z-0">城</div>
      <div className="absolute bottom-8 right-8 text-red-900/20 text-9xl font-zen writing-vertical-rl pointer-events-none select-none z-0">武士</div>

      {/* --- NEW LANTERNS --- */}
      {/* Left Lantern - hidden on very small screens to avoid overlap */}
      <motion.div 
        variants={lanternSway}
        animate="animate"
        className="absolute left-[2%] lg:left-[10%] top-0 z-20 hidden sm:block origin-top"
      >
        <LanternSVG />
      </motion.div>
       {/* Right Lantern */}
      <motion.div 
        variants={lanternSway}
        animate="animate"
        className="absolute right-[2%] lg:right-[10%] top-0 z-20 hidden sm:block origin-top"
      >
        <LanternSVG />
      </motion.div>

      {/* --- MAIN CARD --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg relative z-10 mt-10 sm:mt-0"
      >
        {/* Torii Gate Top Decoration */}
        <div className="w-[108%] -ml-[4%] h-5 bg-[#7f1d1d] border border-[#450a0a] shadow-lg relative z-20 mb-[-12px] mx-auto rounded-sm flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#991b1b]/50"></div>
        </div>
        
        <div className="bg-[#1c0505]/85 backdrop-blur-sm border-x border-b border-[#7f1d1d]/30 shadow-[0_0_60px_rgba(0,0,0,1)] p-8 md:p-12 relative">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-5xl font-zen text-[#e5e5e5] mb-2 tracking-widest drop-shadow-md">LOGIN</h2>
            <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-red-800"></div>
                <p className="text-[#dc2626] font-noto tracking-[0.3em] text-sm font-bold uppercase">ログイン</p>
                <div className="h-[1px] w-8 bg-red-800"></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* REMOVED GOOGLE SIGN IN BUTTON */}

            {/* Sword Divider (Kept as a separator) */}
            <div className="relative flex items-center justify-center py-2">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent"></div>
              <div className="mx-4 text-[#7f1d1d] rotate-45 transform opacity-80">
                <Sword size={24} strokeWidth={1.5} />
              </div>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent"></div>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              <div className="relative">
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
                  {(!emailError && emailErr) && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1">
                      {emailErr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <TextField
                  label="Password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#78716c", "&:hover": { color: "#dc2626" } }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles(passwordError)}
                  onBlur={validatePassword}
                />
                <AnimatePresence>
                  {!passwordError && passwordErr && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs mt-1 font-noto font-bold tracking-wide pl-1">
                      {passwordErr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {error && (
              <div className="p-3 border border-red-900 bg-red-950/50 text-red-300 text-center text-sm font-cinzel rounded-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center mt-2">
                <span className="text-[#57534e] text-xs font-noto">Forgot?</span>
                <Link href="/forgot" className="text-sm text-[#dc2626] hover:text-red-400 transition-colors font-cinzel font-semibold tracking-wide">
                    Reset Password
                </Link>
            </div>

            {/* MODIFIED ENTER BUTTON WITH GLITCH EFFECT */}
            <Button
              onMouseDown={handleLogin}
              disabled={loading}
              /* Changed colors to fiery orange/red theme */
              className="w-full h-14 bg-gradient-to-r from-orange-900 to-red-900 hover:from-orange-800 hover:to-red-800 text-[#fff7ed] border border-orange-700/50 font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] disabled:opacity-50 disabled:cursor-not-allowed glitch-btn relative group"
              // Data attributes used by CSS for the glitch text swapping
              data-text-eng={loading ? "PROCESSING..." : "ENTER"}
            >
              {/* The actual text content is hidden but necessary for accessibility and layout, 
                  the visible text is rendered via CSS pseudo-elements using the data attributes */}
              <span className="invisible font-cinzel text-lg">
                {loading ? "PROCESSING..." : "ENTER"}
              </span>

              {/* The element that holds the glitching text animation */}
              <span 
                className="glitch-content absolute inset-0 flex items-center justify-center font-cinzel text-lg"
                data-text-eng={loading ? "PROCESSING..." : "ENTER"}
                data-text-jp={loading ? "処理中..." : "入る"} // Japanese text for the glitch state
              ></span>
            </Button>

            {/* Footer */}
            <div className="text-center mt-8 border-t border-[#292524] pt-4">
              <p className="text-[#78716c] text-sm font-cinzel">
                New Warrior?{" "}
                <Link href="/signup" className="text-[#dc2626] font-bold hover:text-white hover:underline transition-colors ml-1">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom "Feet" */}
        <div className="flex justify-between w-[90%] mx-auto">
            <div className="h-6 w-3 bg-[#450a0a] opacity-80" />
            <div className="h-6 w-3 bg-[#450a0a] opacity-80" />
        </div>
      </motion.div>
    </div>
  );
}