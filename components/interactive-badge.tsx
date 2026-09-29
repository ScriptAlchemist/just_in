import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { BackgroundGradient } from "./ui/backgroundGradiant";

type Point = {
  x: number;
  y: number;
};

const CARD_WIDTH = 200;
const CARD_HEIGHT = 282;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function InteractiveBadge() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const cordHighlightRef = useRef<SVGPathElement>(null);
  const positionRef = useRef<Point>({ x: 0, y: 0 });
  const velocityRef = useRef<Point>({ x: 0, y: 0 });
  const homeRef = useRef<Point>({ x: 0, y: 0 });
  const stageSizeRef = useRef({ width: 0, height: 0 });
  const dragOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const draggingRef = useRef(false);
  const initializedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const drawBadge = useCallback(() => {
    const { width } = stageSizeRef.current;
    const position = positionRef.current;
    const anchorX = width / 2;
    const anchorY = 22;
    const attachmentX = position.x + CARD_WIDTH / 2;
    const attachmentY = position.y + 18;
    const horizontalPull = attachmentX - anchorX;
    const cordLength = Math.max(attachmentY - anchorY, 80);
    const controlOneX = anchorX + horizontalPull * 0.12;
    const controlOneY = anchorY + cordLength * 0.34;
    const controlTwoX = attachmentX - horizontalPull * 0.18;
    const controlTwoY = attachmentY - cordLength * 0.28;
    const path = `M ${anchorX} ${anchorY} C ${controlOneX} ${controlOneY}, ${controlTwoX} ${controlTwoY}, ${attachmentX} ${attachmentY}`;
    const tilt = clamp(
      horizontalPull * 0.045 + velocityRef.current.x * 0.28,
      -18,
      18,
    );

    cardRef.current?.style.setProperty(
      "transform",
      `translate3d(${position.x}px, ${position.y}px, 0) rotate(${tilt}deg)`,
    );
    cardRef.current?.style.setProperty("opacity", "1");
    cordRef.current?.setAttribute("d", path);
    cordHighlightRef.current?.setAttribute("d", path);
  }, []);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateMeasurements = () => {
      const { width, height } = stage.getBoundingClientRect();
      const home = {
        x: Math.max(
          12,
          width / 2 - CARD_WIDTH / 2 + Math.min(width * 0.08, 34),
        ),
        y: Math.max(86, Math.min(height - CARD_HEIGHT - 18, 112)),
      };

      stageSizeRef.current = { width, height };
      homeRef.current = home;

      if (!initializedRef.current) {
        positionRef.current = home;
        initializedRef.current = true;
      } else if (!draggingRef.current) {
        positionRef.current = home;
        velocityRef.current = { x: 0, y: 0 };
      }

      drawBadge();
    };

    const observer = new ResizeObserver(updateMeasurements);
    observer.observe(stage);
    updateMeasurements();

    return () => observer.disconnect();
  }, [drawBadge]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = media.matches;
    };

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    let frame = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;

      if (!draggingRef.current && initializedRef.current) {
        const position = positionRef.current;
        const velocity = velocityRef.current;
        const home = homeRef.current;

        if (reducedMotionRef.current) {
          positionRef.current = { ...home };
          velocityRef.current = { x: 0, y: 0 };
        } else {
          velocity.x += (home.x - position.x) * 0.026 * elapsed;
          velocity.y += (home.y - position.y) * 0.026 * elapsed;
          velocity.x *= Math.pow(0.94, elapsed);
          velocity.y *= Math.pow(0.94, elapsed);
          position.x += velocity.x * elapsed;
          position.y += velocity.y * elapsed;

          if (
            Math.abs(home.x - position.x) < 0.05 &&
            Math.abs(home.y - position.y) < 0.05 &&
            Math.abs(velocity.x) < 0.05 &&
            Math.abs(velocity.y) < 0.05
          ) {
            positionRef.current = { ...home };
            velocityRef.current = { x: 0, y: 0 };
          }
        }

        drawBadge();
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [drawBadge]);

  const moveToPointer = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return;

      const bounds = stage.getBoundingClientRect();
      const x = clamp(
        clientX - bounds.left - dragOffsetRef.current.x,
        10,
        Math.max(10, bounds.width - CARD_WIDTH - 10),
      );
      const y = clamp(
        clientY - bounds.top - dragOffsetRef.current.y,
        52,
        Math.max(52, bounds.height - CARD_HEIGHT - 10),
      );
      const now = performance.now();
      const elapsed = Math.max(now - lastPointerRef.current.time, 8);

      velocityRef.current = {
        x: clamp(
          ((clientX - lastPointerRef.current.x) / elapsed) * 11,
          -28,
          28,
        ),
        y: clamp(
          ((clientY - lastPointerRef.current.y) / elapsed) * 11,
          -24,
          24,
        ),
      };
      lastPointerRef.current = { x: clientX, y: clientY, time: now };
      positionRef.current = { x, y };
      drawBadge();
    },
    [drawBadge],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    draggingRef.current = true;
    dragOffsetRef.current = {
      x: event.clientX - bounds.left - positionRef.current.x,
      y: event.clientY - bounds.top - positionRef.current.y,
    };
    lastPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
    velocityRef.current = { x: 0, y: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    moveToPointer(event.clientX, event.clientY);
  };

  const releaseBadge = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const offsets: Record<string, Point> = {
      ArrowLeft: { x: -24, y: 0 },
      ArrowRight: { x: 24, y: 0 },
      ArrowUp: { x: 0, y: -24 },
      ArrowDown: { x: 0, y: 24 },
    };
    const offset = offsets[event.key];
    if (!offset) return;

    event.preventDefault();
    const { width, height } = stageSizeRef.current;
    positionRef.current = {
      x: clamp(
        positionRef.current.x + offset.x,
        10,
        Math.max(10, width - CARD_WIDTH - 10),
      ),
      y: clamp(
        positionRef.current.y + offset.y,
        52,
        Math.max(52, height - CARD_HEIGHT - 10),
      ),
    };
    velocityRef.current = {
      x: offset.x * 0.22,
      y: offset.y * 0.22,
    };
    drawBadge();
  };

  return (
    <BackgroundGradient
      containerClassName="h-full rounded-2xl"
      className="h-full"
      animate={false}
    >
      <div className="interactive-badge" ref={stageRef}>
        <svg
          className="interactive-badge-cord"
          aria-hidden="true"
        >
          <path ref={cordRef} className="badge-cord-shadow" />
          <path ref={cordHighlightRef} className="badge-cord-highlight" />
        </svg>
        <span className="badge-wall-anchor" aria-hidden="true">
          <span />
        </span>
        <button
          ref={cardRef}
          type="button"
          className="consultant-badge"
          data-dragging="false"
          aria-label="Interactive Some(Scripting) badge. Drag it or use the arrow keys to move it."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={releaseBadge}
          onPointerCancel={releaseBadge}
          onLostPointerCapture={releaseBadge}
          onKeyDown={handleKeyDown}
        >
          <span className="badge-hardware" aria-hidden="true">
            <span className="badge-ring" />
            <span className="badge-clasp" />
          </span>
          <span className="badge-card-face">
            <span className="badge-card-topline">
              <span className="badge-wordmark">Some(Scripting)</span>
              <span className="badge-status-light" aria-hidden="true" />
            </span>
            <span className="badge-photo" aria-hidden="true" />
            <span className="badge-identity">
              <strong>Justin Bender</strong>
              <span>Software engineering consultant</span>
            </span>
            <span className="badge-capabilities">
              <span>Product</span>
              <span>Systems</span>
              <span>AI workflows</span>
            </span>
            <span className="badge-footer-row">
              <span>Consultant</span>
              <span aria-hidden="true">JB / 08</span>
            </span>
          </span>
        </button>
      </div>
    </BackgroundGradient>
  );
}
