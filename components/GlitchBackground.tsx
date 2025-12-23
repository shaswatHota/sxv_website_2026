"use client";

import { useEffect, useRef } from "react";
import styles from "./GlitchBackground.module.css";

export default function GlitchBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero-bg");
    const video = videoRef.current;

    // Ensure video loops properly
    if (video) {
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
      });
    }

    const glitch = () => {
      if (!hero) return;
      hero.classList.add(styles.pageGlitch);
      setTimeout(() => hero.classList.remove(styles.pageGlitch), 60);
    };

    const interval = setInterval(() => {
      glitch();
    }, 900 + Math.random() * 600);

    return () => {
      clearInterval(interval);
      if (video) {
        video.removeEventListener('ended', () => {});
      }
    };
  }, []);

  return (
    <section id="hero-bg" className={styles.hero}>
      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        className={styles.video}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
      />

      {/* DARK OVERLAY (SAME AS IMAGE VERSION) */}
      <div className={styles.overlay} />

      {/* FILM GRAIN */}
      <div className={styles.grain} />

      {children}
    </section>
  );
}
