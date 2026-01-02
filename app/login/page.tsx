"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { login, googleSignIn } from "@/services/auth";
import {TextField,InputAdornment,IconButton} from "@mui/material";
import {Visibility,VisibilityOff } from '@mui/icons-material';
import {Prata,Abril_Fatface,Instrument_Serif,Domine,Roboto_Slab,Cormorant_Garamond} from "next/font/google"; 

const prata = Prata({
  subsets:["latin"],
  weight:["400"],
  fallback:["serif"]
});

const af = Abril_Fatface({
  subsets:["latin"],
  weight:["400"],
  fallback:["mono"]
});

const i_serif = Roboto_Slab({
  subsets:["latin"],
  weight:["400"],
  fallback:["sans-serif"]
});

const domine = Domine({
  subsets:["latin"],
  weight:["400"],
  fallback:["serif"]
});

const cd = Cormorant_Garamond({
  subsets:["latin"],
  weight:["400"],
  fallback:["serif"],
  variable:'--font-cormorant-garamond'
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential: string) => {
    setError("");
    setLoading(true);
    try {
      const res = await googleSignIn({ credential });
      localStorage.setItem("token", res.data.token);
      alert("Google Sign-In successful");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen bg-[#E0E5EC] flex justify-center px-4 py-10 text-[#4A5568]">
      <div className="w-full max-w-xl">
        {/*FieldSet added to group*/}
        <fieldset className="pb-8 px-[20px] md:px-8 pt-3 border-2 border-gray-500 rounded-2xl max-md:mx-[6.5px]">
          <legend className={`text-[35px] max-md:text-[29px] px-[6px] ${prata.className} font-extrabold text-center  cursor-default`}>
            LOGIN
          </legend>
          <p className={`text-[30px] max-md:text-[24px] ${af.className} font-semibold text-center  mb-2 cursor-default`}>
            Welcome Back!
          </p>
          <p className={`text-lg max-md:text-[15px] ${domine.className} font-semibold text-center  mb-5 cursor-default`}>
            Sign in to continue
          </p>
          <div className="space-y-5">
            {/* Google Sign-In */}
            <GoogleSignInButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              disabled={loading}
              text="Sign in with Google"
            />

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 h-px bg-[#4A5568]"></div>
              <span className={`px-[3.5px] ${i_serif.className}  font-semibold text-sm cursor-default`}>
                Or continue with email
              </span>
              <div className="flex-1 h-px bg-[#4A5568]"></div>
            </div>
            {/*Input Fields*/}
            <div>
              <TextField
                label="Email*"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    "& fieldset": {
                      borderColor: "#6b7280",
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
                  "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root": {
                    color:"gray.300",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#d1d5db",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "#d1d5db",
                    opacity: 1,
                  },
                }}
              />
            </div>

            <div className="relative">
              <TextField
                label="Password*"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    "& fieldset": {
                      borderColor: "#6b7280",
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
                  "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root": {
                    color:"gray.300",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#d1d5db",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "#d1d5db",
                    opacity: 1,
                  },
                }}
              />
            </div>

            {error && <p className="text-xs text-red-500 mt-[4px]">{error}</p>}

            <div className="flex justify-end items-center mt-[3px]">
              <Link
                href="/forgot"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            {/*Login Button*/}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full cursor-pointer mt-[3px] py-3 px-1.5 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700  font-semibold disabled:bg-blue-300 transition-colors duration-300 shadow-sm"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="flex justify-center gap-1 md:gap-[3px]">
              <p className="text-[15.5px] max-md:text-[14.5px]  font-medium md:font-semibold cursor-default">
                Didn&apos;t register?{" "}
              </p>
              <Link
                href="/signup"
                className="max-md:text-[14.5px] text-[15.5px] text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline font-medium md:font-semibold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
