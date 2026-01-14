"use client";

import { Stack, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import Countdown, { zeroPad } from "react-countdown";
import { HydrationProvider, Server, Client } from "react-hydration-provider";

const Completionist = () => (
  <>
    <Stack
      sx={{
        width: "auto",
        position: "relative",
        padding: { xs: "10px", sm: "15px", md: "20px" },
      }}
    >
      <svg
        width="54"
        height="62"
        viewBox="0 0 54 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "clamp(30px, 8vw, 54px)", height: "auto" }}
      >
        <path
          d="M54 30.9779C43.408 32.0827 37.3224 33.0991 33.5863 36.4576C29.1954 40.3906 28.1555 47.5937 27 62C25.806 47.0634 24.7275 39.9045 19.913 36.0599C16.1769 33.0549 10.1298 32.0827 0 31.0221C10.5535 29.9173 16.6776 28.9009 20.3752 25.5866C24.8046 21.6094 25.8445 14.4505 27 0C28.0785 13.3015 29.0414 20.4163 32.6234 24.526C36.2054 28.6358 42.4451 29.7847 54 30.9779Z"
          fill="#00AF9A"
        />
      </svg>
      <Typography
        sx={{
          fontFamily: "Orbitron, monospace",
          whiteSpace: { xs: "normal", sm: "nowrap" },
          position: "relative",
          right: { xs: "0", sm: "60px" },
          fontSize: { xs: "24px", sm: "40px", md: "60px" },
          color: "#f7a802",
          fontWeight: { xs: "400", md: "400" },
          marginLeft: { xs: "20px", sm: "35px", md: "50px" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        The Fest is ON!
      </Typography>
      <svg
        width="54"
        height="62"
        viewBox="0 0 54 62"
        fill="none"
        style={{ 
          position: "absolute", 
          right: "-10px", 
          bottom: "-10px",
          width: "clamp(30px, 8vw, 54px)", 
          height: "auto"
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54 30.9779C43.408 32.0827 37.3224 33.0991 33.5863 36.4576C29.1954 40.3906 28.1555 47.5937 27 62C25.806 47.0634 24.7275 39.9045 19.913 36.0599C16.1769 33.0549 10.1298 32.0827 0 31.0221C10.5535 29.9173 16.6776 28.9009 20.3752 25.5866C24.8046 21.6094 25.8445 14.4505 27 0C28.0785 13.3015 29.0414 20.4163 32.6234 24.526C36.2054 28.6358 42.4451 29.7847 54 30.9779Z"
          fill="#C980DB"
        />
      </svg>
    </Stack>
  </>
);

const DigitBox = ({ digit }: { digit: string }) => (
  <Box
    sx={{
      background: "rgba(0, 0, 0, 0.3)",
      border: "2px solid rgba(247, 168, 2, 0.3)",
      borderRadius: "8px",
      padding: { xs: "6px 8px", sm: "8px 12px", md: "12px 16px" },
      minWidth: { xs: "28px", sm: "35px", md: "50px" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography
      sx={{
        fontFamily: "Orbitron, monospace",
        fontSize: { xs: "24px", sm: "35px", md: "60px" },
        color: "#F7A802",
        fontWeight: "700",
        lineHeight: 1,
      }}
    >
      {digit}
    </Typography>
  </Box>
);

const TimeUnit = ({ value, label }: { value: string; label: string }) => {
  const digits = value.split("");
  
  return (
    <Stack alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
      <Stack direction="row" spacing={{ xs: 0.3, sm: 0.5 }}>
        {digits.map((digit, index) => (
          <DigitBox key={index} digit={digit} />
        ))}
      </Stack>
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: { xs: "9px", sm: "12px", md: "14px" },
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <Stack
        direction="row"
        spacing={{ xs: 0.8, sm: 1.5, md: 3 }}
        justifyContent="center"
        alignItems="center"
      >
        <TimeUnit value={zeroPad(days)} label="days" />
        
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: { xs: "20px", sm: "25px", md: "30px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "20px", sm: "30px", md: "40px" },
              color: "#F7A802",
              fontWeight: "bold",
            }}
          >
            :
          </Typography>
        </Box>

        <TimeUnit value={zeroPad(hours)} label="hours" />
        
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: { xs: "20px", sm: "25px", md: "30px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "20px", sm: "30px", md: "40px" },
              color: "#F7A802",
              fontWeight: "bold",
            }}
          >
            :
          </Typography>
        </Box>

        <TimeUnit value={zeroPad(minutes)} label="mins" />
        
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: { xs: "20px", sm: "25px", md: "30px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "20px", sm: "30px", md: "40px" },
              color: "#F7A802",
              fontWeight: "bold",
            }}
          >
            :
          </Typography>
        </Box>

        <TimeUnit value={zeroPad(seconds)} label="sec" />
      </Stack>
    );
  }
};

const Timer = () => {
  // Target: January 16, 2026 at 12:00 AM IST
  const targetDate = new Date("2026-01-16T00:00:00+05:30").getTime();

  return (
    <HydrationProvider>
      <Stack padding="10px" alignItems="center" sx={{ background: "transparent" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: { xs: "15px 0", md: "25px" },
              gap: "10px",
            }}
          >
            <Server>
              {/* Render placeholder on server to avoid hydration mismatch */}
              <Stack
                direction="row"
                spacing={{ xs: 0.8, sm: 1.5, md: 3 }}
                justifyContent="center"
                alignItems="center"
              >
                <TimeUnit value="00" label="days" />
                <Box sx={{ display: "flex", alignItems: "center", paddingBottom: { xs: "20px", sm: "25px", md: "30px" } }}>
                  <Typography sx={{ fontFamily: "Orbitron, monospace", fontSize: { xs: "20px", sm: "30px", md: "40px" }, color: "#F7A802", fontWeight: "bold" }}>:</Typography>
                </Box>
                <TimeUnit value="00" label="hours" />
                <Box sx={{ display: "flex", alignItems: "center", paddingBottom: { xs: "20px", sm: "25px", md: "30px" } }}>
                  <Typography sx={{ fontFamily: "Orbitron, monospace", fontSize: { xs: "20px", sm: "30px", md: "40px" }, color: "#F7A802", fontWeight: "bold" }}>:</Typography>
                </Box>
                <TimeUnit value="00" label="mins" />
                <Box sx={{ display: "flex", alignItems: "center", paddingBottom: { xs: "20px", sm: "25px", md: "30px" } }}>
                  <Typography sx={{ fontFamily: "Orbitron, monospace", fontSize: { xs: "20px", sm: "30px", md: "40px" }, color: "#F7A802", fontWeight: "bold" }}>:</Typography>
                </Box>
                <TimeUnit value="00" label="sec" />
              </Stack>
            </Server>
            <Client>
              <Countdown
                date={targetDate}
                renderer={renderer}
              />
            </Client>
          </Container>
        </Box>
      </Stack>
    </HydrationProvider>
  );
};

export default Timer;