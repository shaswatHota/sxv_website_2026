"use client";

import { useEffect } from "react";
import styles from "./Hero.module.css";
import Timer from "./Timer";

export default function Hero() {
  useEffect(() => {
    const heroText = document.getElementById('heroText');
    const wordLeft = document.getElementById('wordLeft');
    const wordRight = document.getElementById('wordRight');
    const separator = document.getElementById('separator');

    if (!heroText || !wordLeft || !wordRight || !separator) return;

    const CONTENT_EN = { left: "SAMAVESH", right: "VASSAUNT" };
    const CONTENT_JP = { left: "サマヴェシュ", right: "ヴァサント" };

    // Show separator first
    setTimeout(() => {
      separator.style.opacity = '1';
    }, 100);

    // Start slide animation
    setTimeout(() => {
      heroText.classList.add(styles.animateIn);
      
      setTimeout(() => {
        separator.classList.add(styles.morphX);
      }, 1800);

      setTimeout(() => {
        startGlitchCycle();
      }, 3000);
    }, 1000);

    function startGlitchCycle() {
      if (!wordLeft || !wordRight) return;
      
      const triggerGlitch = (element: HTMLElement, newText: string, durationMs: number) => {
        element.classList.add(styles.glitchActive);
        element.classList.remove(styles.flickerHold);
        
        setTimeout(() => {
          element.innerText = newText;
          element.setAttribute('data-text', newText);
        }, durationMs / 2);
        
        setTimeout(() => {
          element.classList.remove(styles.glitchActive);
          element.classList.add(styles.flickerHold);
        }, durationMs);
      };

      const transitionToJP = () => {
        if (wordLeft && wordRight) {
          triggerGlitch(wordLeft, CONTENT_JP.left, 400);
          triggerGlitch(wordRight, CONTENT_JP.right, 400);
          setTimeout(transitionToEN, 2400);
        }
      };

      const transitionToEN = () => {
        if (wordLeft && wordRight) {
          triggerGlitch(wordLeft, CONTENT_EN.left, 600);
          triggerGlitch(wordRight, CONTENT_EN.right, 600);
          setTimeout(transitionToJP, 4600);
        }
      };

      setTimeout(transitionToJP, 500);
    }
  }, []);

  return (
    <div className={styles.heroOverlay} id="heroText">
      <div className={styles.heroContent}>
        <div className={styles.titleContainer}>
          <div className={`${styles.wordWrapper} ${styles.wordLeft}`} id="wordLeft" data-text="SAMAVESH">
            SAMAVESH
          </div>
          <div className={styles.separator} id="separator">
            <div className={`${styles.bar} ${styles.bar1}`}></div>
            <div className={`${styles.bar} ${styles.bar2}`}></div>
          </div>
          <div className={`${styles.wordWrapper} ${styles.wordRight}`} id="wordRight" data-text="VASSAUNT">
            VASSAUNT
          </div>
        </div>
        <div className={styles.subtitleContainer}>
          <div className={styles.subtitle}>
            THE TECHNO CULTURAL FEST OF VSSUT, BURLA
          </div>
        </div>
        <div className={styles.timerContainer}>
          <Timer />
        </div>
      </div>
    </div>
  );
}
