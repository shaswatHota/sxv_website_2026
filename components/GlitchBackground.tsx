"use client";

import { useEffect } from "react";
import styles from "./GlitchBackground.module.css";

export default function GlitchBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const hero = document.getElementById("hero-bg");

    const glitch = () => {
      if (!hero) return;
      hero.classList.add(styles.pageGlitch);
      setTimeout(() => hero.classList.remove(styles.pageGlitch), 60);
    };

    const interval = setInterval(() => {
      glitch();
    }, 900 + Math.random() * 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-bg" className={styles.hero}>
      {/* VIDEO BACKGROUND */}
      <video
        className={styles.video}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* DARK OVERLAY (SAME AS IMAGE VERSION) */}
      <div className={styles.overlay} />

      {/* FILM GRAIN */}
      <div className={styles.grain} />

      {children}
    </section>
  );
}
