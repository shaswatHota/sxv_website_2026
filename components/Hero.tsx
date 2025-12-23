"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const GLITCH_CHARS = "!@#$%^&*<>/[]{}";

function glitchText(text: string, intensity = 2) {
  const chars = text.split("");
  const indexes = new Set<number>();

  while (indexes.size < intensity) {
    const i = Math.floor(Math.random() * chars.length);
    if (chars[i] !== " ") indexes.add(i);
  }

  indexes.forEach((i) => {
    chars[i] =
      GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  });

  return chars.join("");
}

export default function Hero() {
  const [jp, setJp] = useState(true);
  const [samavesh, setSamavesh] = useState("サマヴェシュ");
  const [xText, setXText] = useState("×");
  const [vassaunt, setVassaunt] = useState("ヴァサウント");
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is loaded
    const checkFont = async () => {
      try {
        await document.fonts.load("normal 1em 'Yozakura Regular'");
        setFontLoaded(true);
      } catch (error) {
        console.log("Font loading failed, using fallback");
        setFontLoaded(true); // Still show content with fallback
      }
    };

    checkFont();

    const baseSam = jp ? "サマヴェシュ" : "SAMAVESH";
    const baseX = jp ? "×" : "X";
    const baseVas = jp ? "ヴァサウント" : "VASSAUNT";

    setSamavesh(baseSam);
    setXText(baseX);
    setVassaunt(baseVas);

    const glitchInterval = setInterval(() => {
      setSamavesh(glitchText(baseSam, 2));
      setVassaunt(glitchText(baseVas, 2));

      setTimeout(() => {
        setSamavesh(baseSam);
        setVassaunt(baseVas);
      }, 90);
    }, 600 + Math.random() * 600);

    const langSwitch = setInterval(() => {
      setJp((v) => !v);
    }, 2200);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(langSwitch);
    };
  }, [jp]);

  const paraText =
    "An exploration of identity, design, and technology inspired by modern cyber culture and editorial storytelling.";

  return (
    <div className={`${styles.content} ${!jp ? styles.englishFont : ""} ${fontLoaded ? styles.fontLoaded : styles.fontLoading}`}>
      <div className={styles.titleContainer}>
        <h1 className={styles.glitchTitle}>{samavesh}</h1>
        <h1 className={styles.glitchX}>{xText}</h1>
        <h1 className={styles.glitchTitle}>{vassaunt}</h1>
      </div>

      <p className={styles.glitchPara}>{paraText}</p>
    </div>
  );
}
