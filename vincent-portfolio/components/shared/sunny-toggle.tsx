"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./sunny-toggle.module.css";

type SunnyToggleProps = {
  className?: string;
};

export function SunnyToggle({ className }: SunnyToggleProps) {
  const [isSunny, setIsSunny] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isSunny) {
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isSunny]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isSunny ? styles.overlayActive : ""}`}
        aria-hidden="true"
      >
        <div className={styles.overlayTint} />
        <video
          ref={videoRef}
          className={styles.overlayVideo}
          src="https://theme-switch.pages.dev/assets/leaves.mp4"
          loop
          muted
          playsInline
          preload="none"
        />
      </div>

      <button
        type="button"
        className={`${styles.toggle} ${isSunny ? styles.toggleActive : ""} ${className ?? ""}`}
        onClick={() => setIsSunny((current) => !current)}
        role="switch"
        aria-checked={isSunny}
        aria-label="Let the sun in"
      >
        <span className={styles.label}>Let the sun in</span>
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb}>
            <span className={styles.thumbIndent} />
          </span>
        </span>
      </button>
    </>
  );
}
