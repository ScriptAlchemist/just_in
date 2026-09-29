import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Compass,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useState, type PointerEvent } from "react";

const stages = [
  {
    id: "01",
    label: "Frame",
    title: "Find the decision behind the request.",
    description:
      "Align the product need, constraints, users, and smallest valuable release before complexity takes over.",
    signal: "Product direction",
    output: "A buildable brief",
    icon: Compass,
  },
  {
    id: "02",
    label: "Build",
    title: "Make the hard parts tangible early.",
    description:
      "Prototype the risky decisions, shape a durable system, and turn the useful core into working software.",
    signal: "Technical judgment",
    output: "Reviewable software",
    icon: Boxes,
  },
  {
    id: "03",
    label: "Release",
    title: "Ship with the next change in mind.",
    description:
      "Release in clear increments, document the reasoning, and leave the team with a system it can keep evolving.",
    signal: "Delivery discipline",
    output: "A stronger system",
    icon: Rocket,
  },
];

export default function HomeHero() {
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();
  const stage = stages[activeStage];
  const StageIcon = stage.icon;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <section className="home-hero page-shell" aria-labelledby="home-title">
      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.09, delayChildren: 0.08 },
          },
        }}
      >
        <motion.div
          className="hero-availability"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <span className="status-dot" aria-hidden="true" />
          Independent product engineer · Select engagements
        </motion.div>
        <motion.h1
          id="home-title"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          Complex products.
          <span>Clear decisions.</span>
          Software that ships.
        </motion.h1>
        <motion.p
          className="hero-intro"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          I work with product teams that need a senior engineer who can frame
          the problem, make the architecture calls, and stay hands-on through
          release.
        </motion.p>
        <motion.div
          className="hero-actions"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Link
            href="https://www.linkedin.com/in/benderjustin"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary"
          >
            Discuss a project <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href="/about-me" className="button button-secondary">
            See my experience <ArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
        <motion.dl
          className="hero-proof"
          aria-label="Experience highlights"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div>
            <dt>8+ years</dt>
            <dd>building software</dd>
          </div>
          <div>
            <dt>90% faster</dt>
            <dd>client load-time result</dd>
          </div>
          <div>
            <dt>3+ apps</dt>
            <dd>served by shared UI</dd>
          </div>
        </motion.dl>
      </motion.div>

      <motion.div
        className="consulting-system"
        onPointerMove={handlePointerMove}
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: reduceMotion ? 0 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-label="Interactive consulting process"
      >
        <div className="system-glow" aria-hidden="true" />
        <div className="system-toolbar">
          <span>
            <span className="system-pulse" aria-hidden="true" />
            engagement.system
          </span>
          <span className="system-ready">
            <Check aria-hidden="true" /> Ready
          </span>
        </div>

        <div className="system-stage-tabs" role="tablist" aria-label="Process stage">
          {stages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeStage === index}
              aria-controls="system-stage-panel"
              id={`system-stage-${item.id}`}
              onClick={() => setActiveStage(index)}
            >
              <span>{item.id}</span>
              <strong>{item.label}</strong>
              {activeStage === index ? (
                <motion.span
                  className="system-tab-active"
                  layoutId="system-tab-active"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <div className="system-stage-window">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage.id}
              id="system-stage-panel"
              role="tabpanel"
              aria-labelledby={`system-stage-${stage.id}`}
              className="system-stage-content"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div className="system-stage-icon">
                <StageIcon aria-hidden="true" />
              </div>
              <p className="system-stage-label">Stage {stage.id}</p>
              <h2>{stage.title}</h2>
              <p>{stage.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="system-output" aria-live="polite">
          <div>
            <span>signal</span>
            <strong>{stage.signal}</strong>
          </div>
          <div>
            <span>review</span>
            <strong>Human in the loop</strong>
          </div>
          <div>
            <span>output</span>
            <strong>{stage.output}</strong>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
