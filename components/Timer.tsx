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
      }}
    >
      <svg
        width="54"
        height="62"
        viewBox="0 0 54 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54 30.9779C43.408 32.0827 37.3224 33.0991 33.5863 36.4576C29.1954 40.3906 28.1555 47.5937 27 62C25.806 47.0634 24.7275 39.9045 19.913 36.0599C16.1769 33.0549 10.1298 32.0827 0 31.0221C10.5535 29.9173 16.6776 28.9009 20.3752 25.5866C24.8046 21.6094 25.8445 14.4505 27 0C28.0785 13.3015 29.0414 20.4163 32.6234 24.526C36.2054 28.6358 42.4451 29.7847 54 30.9779Z"
          fill="#00AF9A"
        />
      </svg>
      <Typography
        sx={{
          fontFamily: "Orbitron, monospace",
          whiteSpace: "nowrap",
          position: "relative",
          right: "60px",
          fontSize: { xs: "40px", md: "60px" },
          color: "#f7a802",
          fontWeight: { xs: "400", md: "400" },
          marginLeft: { xs: "35px", md: "50px" },
        }}
      >
        The Fest is ON!
      </Typography>
      <svg
        width="54"
        height="62"
        viewBox="0 0 54 62"
        fill="none"
        style={{ position: "absolute", right: "-10px", bottom: "-10px" }}
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

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <Stack
        direction="row"
        spacing={{ xs: 1, md: 2 }}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Stack alignItems="center" sx={{ width: { xs: "70px", md: "90px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "45px", md: "70px" },
              color: "#F7A802",
              fontWeight: { xs: "500!important", md: "900" },
            }}
          >
            {zeroPad(days)}
          </Typography>
          <Typography id="sub" style={{ color: "#818181", fontSize: "14px" }}>
            days
          </Typography>
        </Stack>
        
        <Typography
          sx={{
            fontFamily: "Orbitron, monospace",
            fontSize: { xs: "35px", md: "50px" },
            color: "#F7A802",
            fontWeight: "bold",
            marginTop: { xs: "22px", md: "35px" },
            marginX: { xs: "8px", md: "12px" }
          }}
        >
          :
        </Typography>
        
        <Stack alignItems="center" sx={{ width: { xs: "70px", md: "90px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "45px", md: "70px" },
              color: "#F7A802",
              fontWeight: { xs: "500!important", md: "900" },
            }}
          >
            {zeroPad(hours)}
          </Typography>
          <Typography id="sub" style={{ color: "#818181", fontSize: "14px" }}>
            hours
          </Typography>
        </Stack>
        
        <Typography
          sx={{
            fontFamily: "Orbitron, monospace",
            fontSize: { xs: "35px", md: "50px" },
            color: "#F7A802",
            fontWeight: "bold",
            marginTop: { xs: "22px", md: "35px" },
            marginX: { xs: "8px", md: "12px" }
          }}
        >
          :
        </Typography>
        
        <Stack alignItems="center" sx={{ width: { xs: "70px", md: "90px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "45px", md: "70px" },
              color: "#F7A802",
              fontWeight: { xs: "500!important", md: "900" },
            }}
          >
            {zeroPad(minutes)}
          </Typography>
          <Typography id="sub" style={{ color: "#818181", fontSize: "14px" }}>
            mins
          </Typography>
        </Stack>
        
        <Typography
          sx={{
            fontFamily: "Orbitron, monospace",
            fontSize: { xs: "35px", md: "50px" },
            color: "#F7A802",
            fontWeight: "bold",
            marginTop: { xs: "22px", md: "35px" },
            marginX: { xs: "8px", md: "12px" }
          }}
        >
          :
        </Typography>
        
        <Stack alignItems="center" sx={{ width: { xs: "70px", md: "90px" } }}>
          <Typography
            sx={{
              fontFamily: "Orbitron, monospace",
              fontSize: { xs: "45px", md: "70px" },
              color: "#F7A802",
              fontWeight: { xs: "500!important", md: "900" },
            }}
          >
            {zeroPad(seconds)}
          </Typography>
          <Typography id="sub" style={{ color: "#818181", fontSize: "14px" }}>
            sec
          </Typography>
        </Stack>
      </Stack>
    );
  }
};

const Timer = () => {
  return (
    <HydrationProvider>
      <Stack padding="10px" alignItems="center" sx={{ background: "none" }}>
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
              <Countdown
                date={Date.now() + 50000}
                renderer={renderer}
              />
            </Server>
            <Client>
              <Countdown
                date={new Date("2026-01-16T00:00:00Z").getTime() - 19800000}
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