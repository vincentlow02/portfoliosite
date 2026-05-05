"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProjects } from "@/content/projects";
import {
  localeCopy as sharedLocaleCopy,
  normalizeLocale,
  type Locale as SiteLocale,
} from "@/lib/site-locale";
import { createHomeChaosController } from "@/components/home/home-chaos";
import styles from "@/components/home/cozy-window-shade.module.css";

type RGB = [number, number, number];
type ThemeMode = "default" | "sunny" | "rain";
type StopAudio = () => void;
const AUDIO_VISUAL_LEAD_MS = 320;
const SHADE_AMBIENCE_SRC = "/audio/shade-ambience.m4a";
const SUNNY_AMBIENCE_SRC = "/audio/sunny-ambience.mp3";
const LOOP_VOLUMES: Record<Exclude<ThemeMode, "rain">, number> = {
  default: 0.94,
  sunny: 0.9,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function blendColor(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function getAnimTime(now: number) {
  const period = 120000;
  const phase = (now % (period * 2)) / period;
  const triangle = phase < 1 ? phase : 2 - phase;

  return triangle * 0.1;
}

function getAnimOpen(now: number) {
  return 0.5 + Math.sin(now * 0.00006) * 0.04 + Math.sin(now * 0.00015) * 0.02;
}

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

async function startLoopingTrack(
  audio: HTMLAudioElement,
  source: string,
  volume = 0.42,
): Promise<StopAudio | null> {
  const resolvedSource = new URL(source, window.location.href).href;

  if (audio.src !== resolvedSource) {
    audio.src = source;
    audio.load();
  }

  audio.volume = volume;
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch {
    return null;
  }

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
  const projects = getProjects();
  const homeProjects = [
    {
      slug: "intoday",
      name: "Intoday",
      year: "2026",
      category: "",
      url: "https://www.intoday.cc/",
    },
    ...projects.flatMap((project) =>
      project.slug === "goevent"
        ? [
            project,
            {
              slug: "lemon-yuzu-fruit-tea",
              name: "Lemon Yuzu Fruit Tea",
              year: "2024",
              category: "Packaging Design Concept",
              url: undefined,
            },
          ]
        : [project],
    ),
  ];
  const sceneRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioPullRef = useRef<HTMLButtonElement | null>(null);
  const leavesVideoRef = useRef<HTMLVideoElement | null>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const weavePreviewVideoRef = useRef<HTMLVideoElement | null>(null);
  const workShelfRef = useRef<HTMLDivElement | null>(null);
  const workPreviewStageRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chaosControllerRef = useRef<ReturnType<typeof createHomeChaosController> | null>(null);
  const stopAmbientAudioRef = useRef<StopAudio | null>(null);
  const pendingPlayTimeoutRef = useRef<number | null>(null);
  const ambientRequestRef = useRef(0);
  const isAmbientStartedRef = useRef(false);
  const isAudioPlayingRef = useRef(false);
  const themeModeRef = useRef<ThemeMode>("default");
  const fadeTargetRef = useRef(1);
  const fadeValueRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [themeMode, setThemeMode] = useState<ThemeMode>("default");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioPressing, setIsAudioPressing] = useState(false);
  const [hasAudioInteracted, setHasAudioInteracted] = useState(false);
  const [isChaosActive, setIsChaosActive] = useState(false);
  const [isHomeReady, setIsHomeReady] = useState(false);
  const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(null);
  const [workPreviewTop, setWorkPreviewTop] = useState(0);
  const [locale, setLocale] = useState<SiteLocale>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const params = new URLSearchParams(window.location.search);
    return normalizeLocale(params.get("lang") ?? undefined);
  });

  const copy = sharedLocaleCopy[locale];
  const audioPrompt = isAudioPlaying
    ? copy.audioLabels.playing
    : hasAudioInteracted
      ? copy.audioLabels.muted
      : copy.audioLabels.idle;

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    setLocale(nextLocale);

    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);

    const query = params.toString();
    const nextUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState({}, "", nextUrl);
  };

  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }

    const controller = createHomeChaosController(sceneRef.current);
    chaosControllerRef.current = controller;

    return () => {
      controller.cleanup();
      chaosControllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIsHomeReady(true);
    }, 260);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    isAudioPlayingRef.current = isAudioPlaying;
  }, [isAudioPlaying]);

  useEffect(() => {
    themeModeRef.current = themeMode;
  }, [themeMode]);

  useEffect(() => {
    const body = document.body;

    body.classList.remove("home-default", "home-sunny", "home-rain");
    body.classList.add(`home-${themeMode}`);

    return () => {
      body.classList.remove("home-default", "home-sunny", "home-rain");
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
    const video = weavePreviewVideoRef.current;

    if (!video) {
      return;
    }

    if (hoveredProjectSlug === "weave-ai") {
      video.pause();
      video.currentTime = 0;
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [hoveredProjectSlug]);

  const updateWorkPreview = (slug: string, target: HTMLElement) => {
    const shelf = workShelfRef.current;
    const stage = workPreviewStageRef.current;

    setHoveredProjectSlug(slug);

    if (!shelf || !stage) {
      return;
    }

    const shelfBox = shelf.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const stageHeight = stage.offsetHeight || targetBox.height;
    setWorkPreviewTop(targetBox.bottom - shelfBox.top - stageHeight);
  };

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      ambientRequestRef.current += 1;
      if (pendingPlayTimeoutRef.current !== null) {
        window.clearTimeout(pendingPlayTimeoutRef.current);
        pendingPlayTimeoutRef.current = null;
      }
      stopAmbientAudioRef.current?.();
      stopAmbientAudioRef.current = null;
      isAmbientStartedRef.current = false;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  const stopAmbient = useCallback(() => {
    ambientRequestRef.current += 1;
    if (pendingPlayTimeoutRef.current !== null) {
      window.clearTimeout(pendingPlayTimeoutRef.current);
      pendingPlayTimeoutRef.current = null;
    }
    stopAmbientAudioRef.current?.();
    stopAmbientAudioRef.current = null;
    isAmbientStartedRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const playAmbientForMode = useCallback(async (mode: ThemeMode) => {
    ambientRequestRef.current += 1;
    const requestId = ambientRequestRef.current;
    stopAmbientAudioRef.current?.();
    stopAmbientAudioRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (mode === "rain") {
      const stop = startRainAmbience(
        getAudioContext(audioContextRef),
      );
      if (ambientRequestRef.current !== requestId) {
        stop();
        isAmbientStartedRef.current = false;
        return false;
      }

      stopAmbientAudioRef.current = stop;
      isAmbientStartedRef.current = true;
      return true;
    }

    if (audioRef.current) {
      const stop = await startLoopingTrack(
        audioRef.current,
        mode === "default" ? SHADE_AMBIENCE_SRC : SUNNY_AMBIENCE_SRC,
        LOOP_VOLUMES[mode],
      );

      if (!stop) {
        isAmbientStartedRef.current = false;
        return false;
      }

      if (ambientRequestRef.current !== requestId) {
        stop();
        isAmbientStartedRef.current = false;
        return false;
      }

      stopAmbientAudioRef.current = stop;
      isAmbientStartedRef.current = true;
      return true;
    }

    isAmbientStartedRef.current = false;
    return false;
  }, []);

  const toggleAudio = useCallback(async () => {
    setHasAudioInteracted(true);

    if (isAudioPlayingRef.current) {
      stopAmbient();
      setIsAudioPlaying(false);
      return;
    }

    setIsAudioPlaying(true);
    isAmbientStartedRef.current = false;
    ambientRequestRef.current += 1;
    const requestId = ambientRequestRef.current;

    if (pendingPlayTimeoutRef.current !== null) {
      window.clearTimeout(pendingPlayTimeoutRef.current);
    }

    pendingPlayTimeoutRef.current = window.setTimeout(() => {
      pendingPlayTimeoutRef.current = null;
      void playAmbientForMode(themeModeRef.current).then((started) => {
        if (ambientRequestRef.current !== requestId) {
          return;
        }

        if (!started) {
          setIsAudioPlaying(false);
        }
      });
    }, AUDIO_VISUAL_LEAD_MS);
  }, [playAmbientForMode, stopAmbient]);

  const activateTheme = useCallback(
    (nextMode: ThemeMode) => {
      setThemeMode(nextMode);
      if (isAudioPlayingRef.current && isAmbientStartedRef.current) {
        void playAmbientForMode(nextMode).then((started) => {
          if (!started) {
            setIsAudioPlaying(false);
          }
        });
      }
    },
    [playAmbientForMode],
  );

  const activateSunnyTheme = useCallback(() => {
    setRotation((current) => current + 360);
    activateTheme("sunny");
  }, [activateTheme]);

  const triggerChaos = useCallback(() => {
    setIsChaosActive((current) => !current);
    void chaosControllerRef.current?.toggle();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;

      if (tagName === "INPUT" || tagName === "TEXTAREA") {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "s":
          activateSunnyTheme();
          break;
        case "r":
          activateTheme("rain");
          break;
        case "d":
        case "escape":
          activateTheme("default");
          break;
        case "a":
          void toggleAudio();
          break;
        case "c":
          triggerChaos();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activateSunnyTheme, activateTheme, toggleAudio, triggerChaos]);

  useEffect(() => {
    const element = audioPullRef.current;

    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let pointerXTarget = 0;
    let pointerStrengthTarget = 0;
    let pointerX = 0;
    let pointerStrength = 0;
    let angle = 0;
    let angularVelocity = 0;
    let shiftX = 0;
    let hoverOscillation = 0;
    let hoverOscillationTarget = 0;
    let hoverPhase = Math.random() * Math.PI * 2;
    let lastFrameTime = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const clearPointer = () => {
      pointerStrengthTarget = 0;
      pointerXTarget = 0;
      hoverOscillationTarget = 0;
    };

    const handlePointerMove = (event: MouseEvent | PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.48;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const radius = 220;
      const influence = clamp(1 - distance / radius, 0, 1);

      pointerStrengthTarget = influence;
      pointerXTarget = clamp(deltaX / 140, -1, 1);
      hoverOscillationTarget = influence;
    };

    const render = (now: number) => {
      const deltaTime = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.05) : 1 / 60;
      lastFrameTime = now;

      if (reducedMotion.matches) {
        element.style.setProperty("--pull-sway-x", "0px");
        element.style.setProperty("--pull-sway-rot", "0deg");
        frameId = window.requestAnimationFrame(render);
        return;
      }

      const time = now / 1000;
      const ambientAngle =
        Math.sin(time * 0.52) * 0.52 + Math.sin(time * 0.21 + 1.3) * 0.18;

      pointerX += (pointerXTarget - pointerX) * 0.055;
      pointerStrength += (pointerStrengthTarget - pointerStrength) * 0.085;
      hoverOscillation += (hoverOscillationTarget - hoverOscillation) * 0.095;
      hoverPhase += deltaTime * 2.35;

      const hoverWave =
        Math.sin(hoverPhase) * hoverOscillation * 1.8 +
        Math.sin(hoverPhase * 0.62 + 1.2) * hoverOscillation * 0.65;
      const pointerAngle = pointerX * pointerStrength * 1.2 + hoverWave;
      const targetAngle = ambientAngle + pointerAngle;
      const stiffness = 0.026;
      const damping = 0.9;

      angularVelocity += (targetAngle - angle) * stiffness;
      angularVelocity *= damping;
      angle += angularVelocity;

      const targetShift = angle * 0.65 + pointerX * pointerStrength * 1.1;
      shiftX += (targetShift - shiftX) * 0.08;

      element.style.setProperty("--pull-sway-x", `${shiftX.toFixed(3)}px`);
      element.style.setProperty("--pull-sway-rot", `${angle.toFixed(3)}deg`);

      frameId = window.requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        clearPointer();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    window.addEventListener("blur", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(frameId);
      element.style.setProperty("--pull-sway-x", "0px");
      element.style.setProperty("--pull-sway-rot", "0deg");
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let frameId = 0;
    const offscreenCache: Record<string, HTMLCanvasElement> = {};

    const fit = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getOffscreenCanvas = (key: string, width: number, height: number) => {
      const existing = offscreenCache[key];

      if (existing && existing.width === width && existing.height === height) {
        return existing;
      }

      const nextCanvas = document.createElement("canvas");
      nextCanvas.width = width;
      nextCanvas.height = height;
      offscreenCache[key] = nextCanvas;

      return nextCanvas;
    };

    const draw = (now: number) => {
      const deltaTime = lastTimeRef.current
        ? (now - lastTimeRef.current) / 1000
        : 0.016;
      lastTimeRef.current = now;

      const target = themeMode === "default" ? 1 : 0;
      fadeTargetRef.current = target;
      const transitionStep = deltaTime / 1.8;

      if (fadeValueRef.current < fadeTargetRef.current) {
        fadeValueRef.current = Math.min(
          fadeValueRef.current + transitionStep,
          1,
        );
      } else if (fadeValueRef.current > fadeTargetRef.current) {
        fadeValueRef.current = Math.max(
          fadeValueRef.current - transitionStep,
          0,
        );
      }

      const fadeEase =
        fadeValueRef.current * fadeValueRef.current * (3 - 2 * fadeValueRef.current);

      if (fadeValueRef.current === 0 && fadeTargetRef.current === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const animTime = getAnimTime(now);
      const openAmount = getAnimOpen(now);
      const normalizedTime = animTime / 0.35;

      const shadowTarget = blendColor(
        [232, 236, 237],
        [241, 244, 244],
        normalizedTime,
      );
      const shadowColor = blendColor([255, 255, 255], shadowTarget, fadeEase);
      const glowTarget = blendColor(
        [238, 241, 241],
        [246, 247, 247],
        normalizedTime,
      );
      const glowColor = blendColor([255, 255, 255], glowTarget, fadeEase);

      const skewX = lerp(0.34, 0.26, normalizedTime);
      const skewY = lerp(0.13, 0.09, normalizedTime);
      const stretch = lerp(1.9, 1.6, normalizedTime);
      const glowAlpha = lerp(0.28, 0.17, normalizedTime) * fadeEase;
      const baseSoftness = lerp(12, 7, normalizedTime);

      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgb(${shadowColor[0]}, ${shadowColor[1]}, ${shadowColor[2]})`;
      context.fillRect(0, 0, width, height);

      const projectedWidth = Math.min(width * 0.58, 420) * stretch;
      const projectedHeight = Math.min(height * 0.72, 500) * stretch * 0.78;

      const driftX = Math.sin(now * 0.00009) * 5 + Math.sin(now * 0.00025) * 2.5;
      const driftY = Math.cos(now * 0.00011) * 3.5 + Math.cos(now * 0.00022) * 1.8;
      const projectedX = lerp(width * 0.01, width * 0.06, normalizedTime) + driftX;
      const projectedY = lerp(height * 0.01, height * 0.03, normalizedTime) + driftY;

      const frameThickness = lerp(10, 7, normalizedTime);
      const slatCount = 18;
      const innerHeight = projectedHeight - frameThickness * 2;
      const spacing = innerHeight / slatCount;
      const slatThickness = spacing * lerp(0.88, 0.12, openAmount);
      const gapHeight = spacing - slatThickness;

      if (gapHeight < 0.3) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      context.save();
      context.translate(projectedX, projectedY);
      context.transform(1, skewY, skewX, 1, 0, 0);

      const offscreenWidth = Math.ceil(projectedWidth + 80);
      const offscreenHeight = Math.ceil(projectedHeight + 80);
      const maskCanvas = getOffscreenCanvas("mask", offscreenWidth, offscreenHeight);
      const maskContext = maskCanvas.getContext("2d");

      if (!maskContext) {
        context.restore();
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      maskContext.clearRect(0, 0, offscreenWidth, offscreenHeight);

      for (let index = 0; index < slatCount; index += 1) {
        const baseY = frameThickness + index * spacing + slatThickness;
        const wobble =
          Math.sin(now * 0.00008 + index * 0.53) * 1.1 +
          Math.sin(now * 0.00019 + index * 0.79) * 0.6;
        const slatY = baseY + wobble;
        const verticalPosition = index / slatCount;
        const slatSoftness = baseSoftness * (0.55 + verticalPosition);
        const distanceFromCenter =
          Math.abs(index - slatCount / 2) / (slatCount / 2);
        const slatAlpha = 1 - distanceFromCenter * 0.1;
        const paddingY = slatSoftness * 1.2;
        const gradient = maskContext.createLinearGradient(
          0,
          slatY - paddingY,
          0,
          slatY + gapHeight + paddingY,
        );

        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(
          paddingY / (gapHeight + paddingY * 2),
          `rgba(255,255,255,${slatAlpha})`,
        );
        gradient.addColorStop(
          1 - paddingY / (gapHeight + paddingY * 2),
          `rgba(255,255,255,${slatAlpha})`,
        );
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        maskContext.fillStyle = gradient;
        maskContext.fillRect(
          frameThickness,
          slatY - paddingY,
          projectedWidth - frameThickness * 2,
          gapHeight + paddingY * 2,
        );
      }

      maskContext.globalCompositeOperation = "destination-in";

      const horizontalMask = maskContext.createLinearGradient(
        frameThickness,
        0,
        projectedWidth - frameThickness,
        0,
      );
      horizontalMask.addColorStop(0, "rgba(255,255,255,0.1)");
      horizontalMask.addColorStop(0.06, "rgba(255,255,255,0.55)");
      horizontalMask.addColorStop(0.15, "rgba(255,255,255,1)");
      horizontalMask.addColorStop(0.5, "rgba(255,255,255,1)");
      horizontalMask.addColorStop(0.72, "rgba(255,255,255,0.8)");
      horizontalMask.addColorStop(0.85, "rgba(255,255,255,0.35)");
      horizontalMask.addColorStop(0.94, "rgba(255,255,255,0.12)");
      horizontalMask.addColorStop(1, "rgba(255,255,255,0.02)");
      maskContext.fillStyle = horizontalMask;
      maskContext.fillRect(0, 0, offscreenWidth, offscreenHeight);

      const verticalMask = maskContext.createLinearGradient(
        0,
        frameThickness,
        0,
        projectedHeight - frameThickness,
      );
      verticalMask.addColorStop(0, "rgba(255,255,255,0.08)");
      verticalMask.addColorStop(0.05, "rgba(255,255,255,0.6)");
      verticalMask.addColorStop(0.12, "rgba(255,255,255,1)");
      verticalMask.addColorStop(0.75, "rgba(255,255,255,0.85)");
      verticalMask.addColorStop(0.88, "rgba(255,255,255,0.35)");
      verticalMask.addColorStop(0.95, "rgba(255,255,255,0.1)");
      verticalMask.addColorStop(1, "rgba(255,255,255,0.02)");
      maskContext.fillStyle = verticalMask;
      maskContext.fillRect(0, 0, offscreenWidth, offscreenHeight);
      maskContext.globalCompositeOperation = "source-over";

      maskContext.globalCompositeOperation = "destination-out";
      const mullionWidth = frameThickness * 0.5;
      const mullionSoftness = baseSoftness * 0.9;
      const mullionX = projectedWidth * 0.47;
      const verticalCut = maskContext.createLinearGradient(
        mullionX - mullionWidth - mullionSoftness,
        0,
        mullionX + mullionWidth + mullionSoftness,
        0,
      );
      verticalCut.addColorStop(0, "rgba(255,255,255,0)");
      verticalCut.addColorStop(0.15, "rgba(255,255,255,1)");
      verticalCut.addColorStop(0.85, "rgba(255,255,255,1)");
      verticalCut.addColorStop(1, "rgba(255,255,255,0)");
      maskContext.fillStyle = verticalCut;
      maskContext.fillRect(
        mullionX - mullionWidth - mullionSoftness,
        0,
        (mullionWidth + mullionSoftness) * 2,
        projectedHeight,
      );

      const mullionY = projectedHeight * 0.4;
      const horizontalCut = maskContext.createLinearGradient(
        0,
        mullionY - mullionWidth - mullionSoftness,
        0,
        mullionY + mullionWidth + mullionSoftness,
      );
      horizontalCut.addColorStop(0, "rgba(255,255,255,0)");
      horizontalCut.addColorStop(0.15, "rgba(255,255,255,1)");
      horizontalCut.addColorStop(0.85, "rgba(255,255,255,1)");
      horizontalCut.addColorStop(1, "rgba(255,255,255,0)");
      maskContext.fillStyle = horizontalCut;
      maskContext.fillRect(
        0,
        mullionY - mullionWidth - mullionSoftness,
        projectedWidth,
        (mullionWidth + mullionSoftness) * 2,
      );

      const cordX = projectedWidth * 0.73 + Math.sin(now * 0.00025) * 2.5;
      const cordWidth = 1.5;
      const cordSoftness = baseSoftness * 0.4;
      const cordCut = maskContext.createLinearGradient(
        cordX - cordWidth - cordSoftness,
        0,
        cordX + cordWidth + cordSoftness,
        0,
      );
      cordCut.addColorStop(0, "rgba(255,255,255,0)");
      cordCut.addColorStop(0.25, "rgba(255,255,255,0.6)");
      cordCut.addColorStop(0.75, "rgba(255,255,255,0.6)");
      cordCut.addColorStop(1, "rgba(255,255,255,0)");
      maskContext.fillStyle = cordCut;
      maskContext.fillRect(
        cordX - cordWidth - cordSoftness,
        frameThickness,
        (cordWidth + cordSoftness) * 2,
        projectedHeight - frameThickness * 2,
      );
      maskContext.globalCompositeOperation = "source-over";

      context.globalCompositeOperation = "destination-out";
      context.drawImage(maskCanvas, 0, 0);
      context.globalCompositeOperation = "source-over";

      const glowCanvas = getOffscreenCanvas("glow", offscreenWidth, offscreenHeight);
      const glowContext = glowCanvas.getContext("2d");

      if (glowContext) {
        glowContext.clearRect(0, 0, offscreenWidth, offscreenHeight);
        const glowX = projectedWidth * 0.38;
        const glowY = projectedHeight * 0.42;
        const glowGradient = glowContext.createRadialGradient(
          glowX,
          glowY,
          0,
          glowX,
          glowY,
          projectedWidth * 0.7,
        );
        glowGradient.addColorStop(
          0,
          `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},${glowAlpha * 0.35})`,
        );
        glowGradient.addColorStop(
          0.5,
          `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},${glowAlpha * 0.16})`,
        );
        glowGradient.addColorStop(1, "rgba(255,235,200,0)");
        glowContext.fillStyle = glowGradient;
        glowContext.fillRect(0, 0, offscreenWidth, offscreenHeight);
        glowContext.globalCompositeOperation = "destination-in";
        glowContext.drawImage(maskCanvas, 0, 0);
        glowContext.globalCompositeOperation = "source-over";
        context.drawImage(glowCanvas, 0, 0);
      }

      context.restore();
      frameId = window.requestAnimationFrame(draw);
    };

    fit();
    window.addEventListener("resize", fit);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", fit);
      window.cancelAnimationFrame(frameId);
      lastTimeRef.current = 0;
    };
  }, [themeMode]);

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
    <main ref={sceneRef} className={styles.scene}>
      <audio
        ref={audioRef}
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

      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.page}>
        <aside className={styles.rail}>
            <button
              ref={audioPullRef}
              data-chaos-block
            type="button"
            className={`${styles.audioPull} ${isAudioPlaying ? styles.audioPullActive : ""} ${
              isAudioPressing ? styles.audioPullPressing : ""
            }`}
            onClick={() => {
              void toggleAudio();
            }}
            onPointerDown={() => setIsAudioPressing(true)}
            onPointerUp={() => setIsAudioPressing(false)}
            onPointerCancel={() => setIsAudioPressing(false)}
            onPointerLeave={() => setIsAudioPressing(false)}
            onBlur={() => setIsAudioPressing(false)}
            aria-pressed={isAudioPlaying}
            aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
          >
            <span className={styles.audioHaloOuter} aria-hidden="true" />
            <span className={styles.audioHaloInner} aria-hidden="true" />
            <span className={styles.audioLine} aria-hidden="true" />
              <span
                className={styles.audioKnob}
                aria-hidden="true"
              />
              <span className={styles.audioLabel} aria-hidden="true">
                {audioPrompt}
              </span>
            </button>
          </aside>

        <section className={styles.content}>
          <div className={styles.controls}>
            <div
              className={styles.modeSwitch}
              role="group"
              aria-label="Theme mode"
            >
              <button
                type="button"
                className={`${styles.shortcutHint} ${
                  isChaosActive ? styles.shortcutHintActive : ""
                }`}
                onClick={triggerChaos}
                aria-label="Trigger crash effect"
                aria-pressed={isChaosActive}
              >
                C
              </button>
              <button
                data-chaos-block
                type="button"
                className={`${styles.toggle} ${themeMode === "default" ? styles.toggleActive : ""}`}
                onClick={() => activateTheme("default")}
                aria-pressed={themeMode === "default"}
                aria-label="Switch to shade mode"
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
                    <rect x="4" y="4" width="16" height="16" rx="1.5" />
                    <path d="M12 4V20" />
                    <path d="M4 12H20" />
                  </svg>
                </button>

              <button
                data-chaos-block
                type="button"
                className={`${styles.toggle} ${themeMode === "sunny" ? styles.toggleActive : ""}`}
                onClick={activateSunnyTheme}
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
                data-chaos-block
                type="button"
                className={`${styles.toggle} ${themeMode === "rain" ? styles.toggleActive : ""}`}
                onClick={() => activateTheme("rain")}
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

          <div
            className={`${styles.homeOverlay} ${
              isHomeReady ? styles.homeOverlayReady : styles.homeOverlayPending
            }`}
          >
            <section className={styles.introBlock}>
              <div className={styles.portraitFrame} data-chaos-block>
                <Image
                  src="/images/home-portrait.png"
                  alt="Portrait of Vincent Low Sik Ching"
                  width={56}
                  height={56}
                  className={styles.portrait}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setIsHomeReady(true)}
                />
              </div>

              <div className={styles.copy}>
                <h1 className={styles.name} data-chaos-words>
                  Vincent Low Sik Ching
                </h1>

                <div className={styles.summary} data-chaos-words>
                  {copy.introLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </section>

            <nav aria-label="Homepage" className={styles.nav}>
              {copy.navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={`${item.href}?lang=${locale}`}
                  className={styles.navLink}
                  data-chaos-block
                  style={{ "--enter-delay": `${180 + index * 55}ms` } as CSSProperties}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <section aria-labelledby="selected-work" className={styles.workList}>
              <h2 id="selected-work" className={styles.srOnly}>
                Selected work
              </h2>

              <div className={styles.workShelf} ref={workShelfRef}>
                <div className={styles.workEntries}>
                  {homeProjects.map((project, index) => {
                    const href = project.url ?? `/projects/${project.slug}?lang=${locale}`;
                    const isExternal = !!project.url;
                    const isLemonProject = project.slug === "lemon-yuzu-fruit-tea";
                    const category =
                      project.slug === "intoday"
                        ? ""
                        : copy.projectCategories[project.slug] ?? project.category;
                    const displayTitle =
                      project.slug === "goevent"
                        ? "GoEvent (case study)"
                        : project.name;
                    const displayMeta = isLemonProject
                      ? "2024 Packaging Design Concept"
                      : `${project.year}${category ? ` . ${category}` : ""}`;
                    const itemContent = (
                      <>
                        <span className={styles.workTitle} data-chaos-words>
                          {displayTitle}
                        </span>
                        <span className={styles.workMeta} data-chaos-words>
                          {displayMeta}
                        </span>
                      </>
                    );

                    return (
                      <Link
                        key={project.slug}
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={styles.workItem}
                        style={{ "--enter-delay": `${320 + index * 70}ms` } as CSSProperties}
                        onMouseEnter={(event) =>
                          updateWorkPreview(project.slug, event.currentTarget)
                        }
                        onMouseLeave={() =>
                          setHoveredProjectSlug((current) =>
                            current === project.slug ? null : current,
                          )
                        }
                        onFocus={(event) =>
                          updateWorkPreview(project.slug, event.currentTarget)
                        }
                        onBlur={() =>
                          setHoveredProjectSlug((current) =>
                            current === project.slug ? null : current,
                          )
                        }
                    >
                      {itemContent}
                    </Link>
                    );
                  })}
                </div>

                <div
                  ref={workPreviewStageRef}
                  className={`${styles.workPreviewStage} ${
                    hoveredProjectSlug ? styles.workPreviewStageActive : ""
                  }`}
                  style={{ "--preview-top": `${workPreviewTop}px` } as CSSProperties}
                  aria-hidden={hoveredProjectSlug ? "false" : "true"}
                >
                  <div
                    className={`${styles.workPreviewCard} ${
                      hoveredProjectSlug === "weave-ai"
                        ? styles.workPreviewCardVisible
                        : ""
                    } ${styles.weavePreview}`}
                  >
                    <div className={styles.weavePreviewMedia}>
                      <video
                        ref={weavePreviewVideoRef}
                        className={styles.weavePreviewVideo}
                        src="/videos/weave-preview.mp4"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  </div>

                  <div
                    className={`${styles.workPreviewCard} ${
                      hoveredProjectSlug === "intoday"
                        ? styles.workPreviewCardVisible
                        : ""
                    } ${styles.intodayPreview}`}
                  >
                    <div className={styles.intodayPreviewMedia}>
                      <Image
                        src="/images/intoday-optimized.webp"
                        alt="Intoday preview"
                        width={7352}
                        height={5328}
                        className={styles.intodayPreviewImage}
                        sizes="(min-width: 1040px) 13rem, 100vw"
                      />
                    </div>
                  </div>

                  <div
                    className={`${styles.workPreviewCard} ${
                      hoveredProjectSlug === "lemon-yuzu-fruit-tea"
                        ? styles.workPreviewCardVisible
                        : ""
                    } ${styles.packagingPreview}`}
                  >
                    <div className={styles.packagingPreviewMedia}>
                      <Image
                        src="/images/packaging01-optimized.webp"
                        alt="Lemon Yuzu Fruit Tea packaging preview"
                        width={1491}
                        height={1055}
                        className={styles.packagingPreviewImage}
                        sizes="(min-width: 1040px) 13rem, 100vw"
                      />
                    </div>
                  </div>

                  <div
                    className={`${styles.workPreviewCard} ${
                      hoveredProjectSlug === "goevent"
                        ? styles.workPreviewCardVisible
                        : ""
                    } ${styles.goeventPreview}`}
                  >
                    <div className={styles.goeventPreviewMedia}>
                      <Image
                        src="/images/goeventphoto.png"
                        alt="GoEvent preview"
                        width={3092}
                        height={1924}
                        className={styles.goeventPreviewImage}
                        sizes="(min-width: 1040px) 13rem, 100vw"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={styles.localeSwitch}
                role="group"
                aria-label="Language"
              >
                {[
                  { key: "en", label: "EN" },
                  { key: "zh", label: "中" },
                  { key: "ja", label: "日" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`${styles.localeButton} ${
                      locale === item.key ? styles.localeButtonActive : ""
                    }`}
                    data-chaos-block
                    onClick={() => handleLocaleChange(item.key as SiteLocale)}
                    aria-pressed={locale === item.key}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
