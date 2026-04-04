"use client";

type MatterModule = typeof import("matter-js");
type MatterBody = import("matter-js").Body;
type MatterEngine = import("matter-js").Engine;

type ChaosController = {
  toggle: () => Promise<void>;
  cleanup: () => void;
};

type RestoreEntry = {
  el: HTMLElement;
  html: string | null;
  visibility: string;
};

type Candidate = {
  el: HTMLElement;
  rect: DOMRect;
  type: "word" | "block";
};

type ChaosItem = {
  body: MatterBody;
  overlay: HTMLDivElement;
  el: HTMLElement;
  type: "word" | "block";
  cx: number;
  cy: number;
  width: number;
  height: number;
  visibility: string;
};

type ChaosState = {
  items: ChaosItem[];
  overlayRoot: HTMLDivElement;
  restoreEntries: RestoreEntry[];
  cleanupOverflow: () => void;
  detachDragListeners: () => void;
};

const WORD_CLASS = "chaos-word-fragment";

function easeInOutQuad(value: number) {
  return value < 0.5
    ? 2 * value * value
    : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function canSplitTag(tagName: string) {
  return !["IMG", "VIDEO", "SVG", "CANVAS", "BUTTON", "INPUT"].includes(tagName);
}

function walkText(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const content = node.textContent ?? "";

    if (!content.trim()) {
      return;
    }

    const fragment = document.createDocumentFragment();

    content.split(/(\s+)/).forEach((part) => {
      if (!part) {
        return;
      }

      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      const span = document.createElement("span");
      span.className = WORD_CLASS;
      span.style.display = "inline-block";
      span.textContent = part;
      fragment.appendChild(span);
    });

    node.parentNode?.replaceChild(fragment, node);
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement;

    if (!canSplitTag(element.tagName)) {
      return;
    }

    Array.from(element.childNodes).forEach(walkText);
  }
}

async function loadMatter() {
  return import("matter-js");
}

function buildWordOverlays(
  root: HTMLElement,
  candidates: Candidate[],
  restoreEntries: RestoreEntry[],
) {
  root.querySelectorAll<HTMLElement>("[data-chaos-words]").forEach((container) => {
    restoreEntries.push({
      el: container,
      html: container.innerHTML,
      visibility: container.style.visibility,
    });

    Array.from(container.childNodes).forEach(walkText);

    container.querySelectorAll<HTMLElement>(`.${WORD_CLASS}`).forEach((span) => {
      const rect = span.getBoundingClientRect();

      if (rect.width < 1 || rect.height < 1) {
        return;
      }

      candidates.push({
        el: span,
        rect,
        type: "word",
      });
    });

    container.style.visibility = "hidden";
  });
}

function buildBlockOverlays(
  root: HTMLElement,
  candidates: Candidate[],
  restoreEntries: RestoreEntry[],
) {
  root.querySelectorAll<HTMLElement>("[data-chaos-block]").forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.width < 1 || rect.height < 1) {
      return;
    }

    restoreEntries.push({
      el: element,
      html: null,
      visibility: element.style.visibility,
    });

    candidates.push({
      el: element,
      rect,
      type: "block",
    });

    element.style.visibility = "hidden";
  });
}

function createWordOverlay(element: HTMLElement, width: number, height: number) {
  const overlay = document.createElement("div");
  const styles = window.getComputedStyle(element);

  Object.assign(overlay.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: `${width}px`,
    height: `${height}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    color: styles.color,
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    lineHeight: styles.lineHeight,
    letterSpacing: styles.letterSpacing,
    textTransform: styles.textTransform,
    pointerEvents: "auto",
    userSelect: "none",
    willChange: "transform",
    cursor: "grab",
    touchAction: "none",
  });

  overlay.textContent = element.textContent ?? "";

  return overlay;
}

function createBlockOverlay(element: HTMLElement, width: number, height: number) {
  const overlay = document.createElement("div");
  const clone = element.cloneNode(true) as HTMLElement;

  Object.assign(overlay.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: "auto",
    userSelect: "none",
    willChange: "transform",
    cursor: "grab",
    touchAction: "none",
  });

  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.visibility = "visible";
  overlay.appendChild(clone);

  return overlay;
}

export function createHomeChaosController(root: HTMLElement): ChaosController {
  let matter: MatterModule | null = null;
  let chaosState: ChaosState | null = null;
  let chaosFrame = 0;
  let engine: MatterEngine | null = null;
  let busy = false;
  let dragBody: MatterBody | null = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragLastX = 0;
  let dragLastY = 0;
  let dragVelocityX = 0;
  let dragVelocityY = 0;

  const clearScene = () => {
    if (!chaosState) {
      return;
    }

    chaosState.detachDragListeners();
    dragBody = null;

    chaosState.restoreEntries.forEach(({ el, html, visibility }) => {
      if (html !== null) {
        el.innerHTML = html;
      }

      el.style.visibility = visibility;
    });

    chaosState.overlayRoot.remove();
    chaosState.cleanupOverflow();
    chaosState = null;
  };

  const cleanup = () => {
    if (chaosFrame) {
      window.cancelAnimationFrame(chaosFrame);
      chaosFrame = 0;
    }

    if (engine && matter) {
      matter.Engine.clear(engine);
      engine = null;
    }

    clearScene();
    busy = false;
  };

  const reverse = () => {
    if (!chaosState || !matter || !engine || busy) {
      return;
    }

    busy = true;
    window.cancelAnimationFrame(chaosFrame);
    const snapshots = chaosState.items.map((item) => ({
      overlay: item.overlay,
      width: item.width,
      height: item.height,
      cx: item.cx,
      cy: item.cy,
      fromX: item.body.position.x,
      fromY: item.body.position.y,
      fromAngle: item.body.angle,
    }));

    const startedAt = performance.now();
    const duration = 820;

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = easeInOutQuad(progress);

      snapshots.forEach((snapshot) => {
        const x = snapshot.fromX + (snapshot.cx - snapshot.fromX) * eased;
        const y = snapshot.fromY + (snapshot.cy - snapshot.fromY) * eased;
        const angle = snapshot.fromAngle * (1 - eased);

        snapshot.overlay.style.transform = `translate(${x - snapshot.width / 2}px, ${y - snapshot.height / 2}px) rotate(${angle}rad)`;
      });

      if (progress < 1) {
        chaosFrame = window.requestAnimationFrame(tick);
        return;
      }

      cleanup();
    };

    chaosFrame = window.requestAnimationFrame(tick);
  };

  const activate = async () => {
    if (busy) {
      return;
    }

    if (chaosState) {
      reverse();
      return;
    }

    busy = true;
    matter ??= await loadMatter();

    const currentMatter = matter;
    const { Engine, Bodies, Body, World } = currentMatter;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const candidates: Candidate[] = [];
    const restoreEntries: RestoreEntry[] = [];

    buildWordOverlays(root, candidates, restoreEntries);
    buildBlockOverlays(root, candidates, restoreEntries);

    const overlayRoot = document.createElement("div");
    overlayRoot.style.position = "fixed";
    overlayRoot.style.inset = "0";
    overlayRoot.style.zIndex = "1000";
    overlayRoot.style.pointerEvents = "none";
    overlayRoot.style.overflow = "hidden";
    overlayRoot.style.userSelect = "none";
    document.body.appendChild(overlayRoot);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    engine = Engine.create({
      gravity: { x: 0, y: 3.1 },
      enableSleeping: true,
    });
    const currentEngine = engine;

    World.add(currentEngine.world, [
      Bodies.rectangle(
        viewportWidth / 2,
        viewportHeight + 60,
        viewportWidth + 360,
        120,
        { isStatic: true, friction: 0.85, restitution: 0.04 },
      ),
      Bodies.rectangle(-40, viewportHeight / 2, 80, viewportHeight * 3, {
        isStatic: true,
      }),
      Bodies.rectangle(viewportWidth + 40, viewportHeight / 2, 80, viewportHeight * 3, {
        isStatic: true,
      }),
    ]);

    const releaseDrag = () => {
      if (!dragBody) {
        return;
      }

      if (currentMatter.Sleeping) {
        currentMatter.Sleeping.set(dragBody, false);
      }

      Body.setVelocity(dragBody, {
        x: dragVelocityX * 0.55,
        y: dragVelocityY * 0.55,
      });
      dragBody = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!dragBody) {
        return;
      }

      dragVelocityX = event.clientX - dragLastX;
      dragVelocityY = event.clientY - dragLastY;
      dragLastX = event.clientX;
      dragLastY = event.clientY;

      Body.setPosition(dragBody, {
        x: event.clientX + dragOffsetX,
        y: event.clientY + dragOffsetY,
      });
      Body.setVelocity(dragBody, { x: 0, y: 0 });
      Body.setAngularVelocity(dragBody, 0);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!dragBody || !event.touches[0]) {
        return;
      }

      const touch = event.touches[0];
      dragVelocityX = touch.clientX - dragLastX;
      dragVelocityY = touch.clientY - dragLastY;
      dragLastX = touch.clientX;
      dragLastY = touch.clientY;

      Body.setPosition(dragBody, {
        x: touch.clientX + dragOffsetX,
        y: touch.clientY + dragOffsetY,
      });
      Body.setVelocity(dragBody, { x: 0, y: 0 });
      Body.setAngularVelocity(dragBody, 0);
      event.preventDefault();
    };

    const handleWindowBlur = () => {
      releaseDrag();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        releaseDrag();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", releaseDrag);
    document.addEventListener("mouseleave", releaseDrag);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", releaseDrag);
    document.addEventListener("touchcancel", releaseDrag);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const items: ChaosItem[] = candidates.map(({ el, rect, type }) => {
      const width = Math.max(rect.width, 2);
      const height = Math.max(rect.height, 2);
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const body = Bodies.rectangle(cx, cy, width, height, {
        friction: type === "word" ? 0.42 : 0.7,
        restitution: type === "word" ? 0.08 : 0.05,
        frictionAir: type === "word" ? 0.006 : 0.01,
        density: type === "word" ? 0.0007 : 0.0012,
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 7.6,
        y: -2.4 - Math.random() * 4.6,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.24);
      World.add(currentEngine.world, body);

      const overlay =
        type === "word"
          ? createWordOverlay(el, width, height)
          : createBlockOverlay(el, width, height);

      overlay.style.transform = `translate(${cx - width / 2}px, ${cy - height / 2}px)`;

      const startDrag = (clientX: number, clientY: number) => {
        if (currentMatter.Sleeping) {
          currentMatter.Sleeping.set(body, false);
        }

        dragBody = body;
        dragOffsetX = body.position.x - clientX;
        dragOffsetY = body.position.y - clientY;
        dragLastX = clientX;
        dragLastY = clientY;
        dragVelocityX = 0;
        dragVelocityY = 0;
        Body.setAngularVelocity(body, 0);
      };

      overlay.addEventListener("mousedown", (event) => {
        if (event.button !== 0) {
          return;
        }

        startDrag(event.clientX, event.clientY);
        event.preventDefault();
      });

      overlay.addEventListener(
        "touchstart",
        (event) => {
          const touch = event.touches[0];

          if (!touch) {
            return;
          }

          startDrag(touch.clientX, touch.clientY);
        },
        { passive: true },
      );

      overlayRoot.appendChild(overlay);

      return {
        body,
        overlay,
        el,
        type,
        cx,
        cy,
        width,
        height,
        visibility: el.style.visibility,
      };
    });

    chaosState = {
      items,
      overlayRoot,
      restoreEntries,
      cleanupOverflow: () => {
        document.body.style.overflow = originalOverflow;
      },
      detachDragListeners: () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", releaseDrag);
        document.removeEventListener("mouseleave", releaseDrag);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", releaseDrag);
        document.removeEventListener("touchcancel", releaseDrag);
        window.removeEventListener("blur", handleWindowBlur);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      },
    };

    const tick = () => {
      if (!engine || !matter || !chaosState) {
        return;
      }

      matter.Engine.update(engine, 1000 / 60);

      chaosState.items.forEach((item) => {
        const { x, y } = item.body.position;
        item.overlay.style.transform = `translate(${x - item.width / 2}px, ${y - item.height / 2}px) rotate(${item.body.angle}rad)`;
      });

      chaosFrame = window.requestAnimationFrame(tick);
    };

    chaosFrame = window.requestAnimationFrame(tick);
    busy = false;
  };

  return {
    toggle: activate,
    cleanup,
  };
}
