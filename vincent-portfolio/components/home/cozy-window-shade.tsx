"use client";

import type { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/home/cozy-window-shade.module.css";

type ThemeMode = "sunny" | "rain";
type StopAudio = () => void;

function getAudioContext(
  ref: MutableRefObject<AudioContext | null>,
): AudioContext {
  if (!ref.current) {
    ref.current = new window.AudioContext();
  }

  if (ref.current.state === "suspended") {
    void ref.current.resume();
  }

  return ref.current;
}

function createPinkNoiseBuffer(
  context: AudioContext,
  duration: number,
  channels: number,
) {
  const length = Math.ceil(context.sampleRate * duration);
  const buffer = context.createBuffer(channels, length, context.sampleRate);

  for (let channel = 0; channel < channels; channel += 1) {
    const data = buffer.getChannelData(channel);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;

    for (let index = 0; index < length; index += 1) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[index] =
        (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
      b6 = white * 0.115926;
    }
  }

  return buffer;
}

function startForestAmbience(audio: HTMLAudioElement): StopAudio {
  audio.volume = 0.42;
  audio.currentTime = 0;
  void audio.play().catch(() => {});

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}

function startRainAmbience(context: AudioContext): StopAudio {
  const sources: Array<{ stop: () => void }> = [];
  const timers: number[] = [];

  const rainSource = context.createBufferSource();
  rainSource.buffer = createPinkNoiseBuffer(context, 4, 2);
  rainSource.loop = true;
  const rainHighPass = context.createBiquadFilter();
  rainHighPass.type = "highpass";
  rainHighPass.frequency.value = 400;
  const rainLowPass = context.createBiquadFilter();
  rainLowPass.type = "lowpass";
  rainLowPass.frequency.value = 8000;
  const rainGain = context.createGain();
  rainGain.gain.value = 0.18;
  rainSource
    .connect(rainHighPass)
    .connect(rainLowPass)
    .connect(rainGain)
    .connect(context.destination);
  rainSource.start();
  sources.push(rainSource);

  const sizzleSource = context.createBufferSource();
  sizzleSource.buffer = createPinkNoiseBuffer(context, 3, 1);
  sizzleSource.loop = true;
  const sizzleHighPass = context.createBiquadFilter();
  sizzleHighPass.type = "highpass";
  sizzleHighPass.frequency.value = 3000;
  const sizzleLowPass = context.createBiquadFilter();
  sizzleLowPass.type = "lowpass";
  sizzleLowPass.frequency.value = 12000;
  const sizzleGain = context.createGain();
  sizzleGain.gain.value = 0.06;
  sizzleSource
    .connect(sizzleHighPass)
    .connect(sizzleLowPass)
    .connect(sizzleGain)
    .connect(context.destination);
  sizzleSource.start();
  sources.push(sizzleSource);

  const scheduleDrips = () => {
    const now = context.currentTime;
    const count = 1 + Math.floor(Math.random() * 3);

    for (let index = 0; index < count; index += 1) {
      const startTime = now + Math.random() * 0.15;
      const duration = 0.02 + Math.random() * 0.04;
      const sampleLength = Math.ceil(context.sampleRate * duration);
      const burst = context.createBuffer(1, sampleLength, context.sampleRate);
      const data = burst.getChannelData(0);

      for (let sample = 0; sample < sampleLength; sample += 1) {
        data[sample] =
          (Math.random() * 2 - 1) *
          Math.exp(-sample / (sampleLength * 0.3));
      }

      const burstSource = context.createBufferSource();
      burstSource.buffer = burst;
      const bandPass = context.createBiquadFilter();
      bandPass.type = "bandpass";
      bandPass.frequency.value = 2000 + Math.random() * 4000;
      bandPass.Q.value = 2 + Math.random() * 3;
      const gain = context.createGain();
      const volume = 0.04 + Math.random() * 0.06;
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      burstSource.connect(bandPass).connect(gain).connect(context.destination);
      burstSource.start(startTime);
      burstSource.stop(startTime + duration + 0.01);
      sources.push(burstSource);
    }

    timers.push(
      window.setTimeout(scheduleDrips, 40 + Math.random() * 100),
    );
  };

  scheduleDrips();

  return () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    sources.forEach((source) => {
      try {
        source.stop();
      } catch {}
    });
  };
}

export function CozyWindowShade() {
  const leavesVideoRef = useRef<HTMLVideoElement | null>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const stopAmbientAudioRef = useRef<StopAudio | null>(null);
  const isAudioPlayingRef = useRef(false);
  const [rotation, setRotation] = useState(0);
  const [themeMode, setThemeMode] = useState<ThemeMode>("sunny");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    isAudioPlayingRef.current = isAudioPlaying;
  }, [isAudioPlaying]);

  useEffect(() => {
    const body = document.body;

    body.classList.remove("home-sunny", "home-rain");
    body.classList.add(`home-${themeMode}`);

    return () => {
      body.classList.remove("home-sunny", "home-rain");
    };
  }, [themeMode]);

  useEffect(() => {
    const video = leavesVideoRef.current;

    if (!video) {
      return;
    }

    if (themeMode === "sunny") {
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [themeMode]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.42;

    const handlePause = () => {
      setIsAudioPlaying(false);
    };

    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      stopAmbientAudioRef.current?.();
      stopAmbientAudioRef.current = null;
      void audioContextRef.current?.close();
      audioContextRef.current = null;
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    stopAmbientAudioRef.current?.();
    stopAmbientAudioRef.current = null;

    if (!isAudioPlaying) {
      return;
    }

    if (themeMode === "rain") {
      stopAmbientAudioRef.current = startRainAmbience(
        getAudioContext(audioContextRef),
      );
      return;
    }

    if (audioRef.current) {
      stopAmbientAudioRef.current = startForestAmbience(audioRef.current);
    }

    return () => {
      stopAmbientAudioRef.current?.();
      stopAmbientAudioRef.current = null;
    };
  }, [isAudioPlaying, themeMode]);

  const toggleAudio = async () => {
    if (isAudioPlayingRef.current) {
      setIsAudioPlaying(false);
      return;
    }

    setIsAudioPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;

      if (tagName === "INPUT" || tagName === "TEXTAREA") {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "s":
          setThemeMode("sunny");
          setRotation((current) => current + 360);
          break;
        case "r":
          setThemeMode("rain");
          break;
        case "escape":
          setThemeMode("sunny");
          break;
        case "a":
          void toggleAudio();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const canvas = rainCanvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const drops: Array<{
      x: number;
      y: number;
      len: number;
      speed: number;
      w: number;
      r: number;
      g: number;
      b: number;
      alpha: number;
      drift: number;
      splashChance: number;
    }> = [];
    const splashes: Array<{
      x: number;
      y: number;
      r: number;
      maxR: number;
      alpha: number;
      life: number;
      maxLife: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnDrops = () => {
      drops.length = 0;
      const layers = [
        {
          count: 70,
          lenMin: 12,
          lenMax: 22,
          speed: 20,
          w: 1,
          color: [220, 229, 238],
          alphaMin: 0.34,
          alphaMax: 0.58,
        },
        {
          count: 150,
          lenMin: 7,
          lenMax: 15,
          speed: 14,
          w: 0.7,
          color: [198, 209, 222],
          alphaMin: 0.2,
          alphaMax: 0.34,
        },
        {
          count: 120,
          lenMin: 4,
          lenMax: 9,
          speed: 9,
          w: 0.4,
          color: [182, 193, 208],
          alphaMin: 0.1,
          alphaMax: 0.22,
        },
      ] as const;

      layers.forEach((layer) => {
        for (let index = 0; index < layer.count; index += 1) {
          drops.push({
            x: Math.random() * (width + 60) - 30,
            y: Math.random() * height,
            len: layer.lenMin + Math.random() * (layer.lenMax - layer.lenMin),
            speed: layer.speed + Math.random() * layer.speed * 0.4,
            w: layer.w + Math.random() * 0.15,
            r: layer.color[0],
            g: layer.color[1],
            b: layer.color[2],
            alpha:
              layer.alphaMin + Math.random() * (layer.alphaMax - layer.alphaMin),
            drift: 1.5 + Math.random(),
            splashChance: layer.w > 1 ? 0.3 : 0.05,
          });
        }
      });
    };

    const tick = () => {
      if (themeMode !== "rain") {
        context.clearRect(0, 0, width, height);
        return;
      }

      context.clearRect(0, 0, width, height);

      for (const drop of drops) {
        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x + drop.drift * (drop.len / drop.speed), drop.y + drop.len);
        context.strokeStyle = `rgba(${drop.r},${drop.g},${drop.b},${drop.alpha})`;
        context.lineWidth = drop.w;
        context.lineCap = "round";
        context.stroke();

        drop.y += drop.speed;
        drop.x += drop.drift;

        if (drop.y > height) {
          if (Math.random() < drop.splashChance) {
            splashes.push({
              x: drop.x,
              y: height - 2 + Math.random() * 4,
              r: 0,
              maxR: 2 + Math.random() * 3,
              alpha: 0.2 + Math.random() * 0.15,
              life: 0,
              maxLife: 8 + Math.random() * 6,
            });
          }

          drop.y = -drop.len - Math.random() * 80;
          drop.x = Math.random() * (width + 60) - 30;
        }
      }

      for (let index = splashes.length - 1; index >= 0; index -= 1) {
        const splash = splashes[index];
        splash.life += 1;
        splash.r = splash.maxR * (splash.life / splash.maxLife);
        const alpha = splash.alpha * (1 - splash.life / splash.maxLife);

        if (alpha <= 0 || splash.life >= splash.maxLife) {
          splashes.splice(index, 1);
          continue;
        }

        context.beginPath();
        context.ellipse(
          splash.x,
          splash.y,
          splash.r * 1.5,
          splash.r * 0.5,
          0,
          0,
          Math.PI * 2,
        );
        context.strokeStyle = `rgba(180,190,205,${alpha})`;
        context.lineWidth = 0.5;
        context.stroke();
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    resize();
    spawnDrops();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, width, height);
    };
  }, [themeMode]);

  return (
    <main className={styles.scene}>
      <audio
        ref={audioRef}
        src="https://theme-switch.pages.dev/assets/forest.mp3"
        loop
        preload="auto"
      />

      <div className={styles.sunnyAtmosphere} aria-hidden="true">
        <video
          ref={leavesVideoRef}
          className={styles.leavesVideo}
          src="https://theme-switch.pages.dev/assets/leaves.mp4"
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className={styles.rainAtmosphere} aria-hidden="true">
        <div className={styles.rainFog} />
        <canvas ref={rainCanvasRef} className={styles.rainCanvas} />
      </div>

      <div className={styles.page}>
        <aside className={styles.rail}>
          <button
            type="button"
            className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonActive : ""}`}
            onClick={() => {
              void toggleAudio();
            }}
            aria-pressed={isAudioPlaying}
            aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
          >
            <span className={styles.audioGlyph}>{isAudioPlaying ? "Sound" : "Mute"}</span>
            <span className={styles.audioMeta}>{isAudioPlaying ? "On" : "Off"}</span>
          </button>
        </aside>

        <section className={styles.content}>
          <div className={styles.controls}>
            <div className={styles.modeSwitch} role="group" aria-label="Theme mode">
              <button
                type="button"
                className={`${styles.toggle} ${themeMode === "sunny" ? styles.toggleActive : ""}`}
                onClick={() => {
                  setThemeMode("sunny");
                  setRotation((current) => current + 360);
                }}
                style={
                  themeMode === "sunny"
                    ? { transform: `rotate(${rotation}deg)` }
                    : undefined
                }
                aria-pressed={themeMode === "sunny"}
                aria-label="Switch to sunny mode"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  {[
                    { x1: "12", y1: "2", x2: "12", y2: "4.5" },
                    { x1: "12", y1: "19.5", x2: "12", y2: "22" },
                    { x1: "4.93", y1: "4.93", x2: "6.7", y2: "6.7" },
                    { x1: "17.3", y1: "17.3", x2: "19.07", y2: "19.07" },
                    { x1: "2", y1: "12", x2: "4.5", y2: "12" },
                    { x1: "19.5", y1: "12", x2: "22", y2: "12" },
                    { x1: "4.93", y1: "19.07", x2: "6.7", y2: "17.3" },
                    { x1: "17.3", y1: "6.7", x2: "19.07", y2: "4.93" },
                  ].map((ray) => (
                    <line
                      key={`${ray.x1}-${ray.y1}-${ray.x2}-${ray.y2}`}
                      {...ray}
                    />
                  ))}
                </svg>
              </button>

              <button
                type="button"
                className={`${styles.toggle} ${themeMode === "rain" ? styles.toggleActive : ""}`}
                onClick={() => setThemeMode("rain")}
                aria-pressed={themeMode === "rain"}
                aria-label="Switch to rainy mode"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 15a4 4 0 1 1 1-7.9A5 5 0 0 1 18 9a3 3 0 0 1-.5 6H7Z" />
                  <path d="M9 18l-1 2" />
                  <path d="M13 18l-1 2" />
                  <path d="M17 18l-1 2" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
