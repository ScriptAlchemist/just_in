// @ts-nocheck

import { ArrowUpRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import PageMeta from "../../components/page-meta";

const InteractiveBadge = dynamic(
  () => import("../../components/interactive-badge"),
  {
    ssr: false,
    loading: () => (
      <div className="interactive-badge-loading" role="status">
        Loading interactive badge…
      </div>
    ),
  },
);

export default function AboutMe() {
  return (
    <>
      <PageMeta
        title="About Justin Bender | Some(Scripting)"
        description="Software engineering experience across product development, frontend systems, AI workflows, performance, and emerging technology."
        path="/about-me"
        image="/assets/blog/authors/skydiver_justin.jpeg"
        imageAlt="Justin Bender skydiving"
      />
      <div className="about-page page-shell">
        <AboutMeInfo />
      </div>
    </>
  );
}

function AboutMeInfo() {
  return (
    <div className="about-content">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About Justin</p>
          <h1>Builder first. Translator always.</h1>
          <p className="about-lede">
            I&apos;m a software engineer and consultant who helps teams turn
            difficult product ideas into clear, maintainable systems.
          </p>
          <p>
            My work spans frontend architecture, product development, legacy
            modernization, AI-assisted workflows, developer tooling, and
            emerging technology. I&apos;m most useful where technical depth and
            practical product judgment need to meet.
          </p>
          <div className="about-location">
            <MapPin aria-hidden="true" /> United States · Working remotely
          </div>
          <div className="hero-actions">
            <Link
              href="https://www.linkedin.com/in/benderjustin"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Connect on LinkedIn <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/writing" className="button button-secondary">
              Read the journal
            </Link>
          </div>
        </div>
        <div className="about-badge-stage">
          <InteractiveBadge />
          <p>Drag the badge</p>
        </div>
      </section>

      <section className="about-profile-strip" aria-label="Professional profile">
        <div>
          <strong>8+ years</strong>
          <span>professional engineering</span>
        </div>
        <div>
          <strong>Product + platform</strong>
          <span>from interface to infrastructure</span>
        </div>
        <div>
          <strong>Hands-on delivery</strong>
          <span>strategy that ends in shipped work</span>
        </div>
      </section>

      <section className="resume-section">
        <div className="resume-heading">
          <p className="eyebrow">Experience</p>
          <h2>A career spent making software more useful.</h2>
          <p>
            From healthcare and contractor platforms to blockchain products,
            shared frontend systems, and AI-assisted engineering.
          </p>
        </div>
        <div className="experience-list">
          <ExperienceItem
            title="Prompt Engineer"
            company="Paperstac"
            date="Apr 2025 - Present"
            description={[
              "Designed agentic development prompts that produce reviewable work, with human oversight and correction built into the workflow.",
            ]}
          />
          <ExperienceItem
            title="Software Engineer"
            company="Paperstac"
            date="Present"
            description={[
              "Built shared UI and Storybook libraries in a Turborepo supporting three or more applications.",
              "Developed reusable React components for Next.js products.",
              "Maintained legacy applications, resolved production issues, and integrated AI-driven features.",
            ]}
          />
          <ExperienceItem
            title="Software Engineer"
            company="Bridge Discussion/Job Searching"
            date="Mar 2023 - Sep 2023"
            description={[
              "Developed using a JavaScript stack (React/Next.js) with GCP/Firebase",
              "Designed and implemented product features for Bridge Discussion",
              "Built functional demos for funding presentations",
            ]}
          />
          <ExperienceItem
            title="Software Engineer"
            company="Cardano Goat"
            date="Nov 2021 - Jan 2023"
            description={[
              "Developed WASM-integrated applications for seamless interaction with Cardano blockchain",
              "Worked with React, Next.js, TypeScript, TailwindCSS, Rust, WebAssembly, IPFS, and Cardano wallet extensions",
              "Integrated cutting-edge open-source tools to maintain a competitive edge",
              "Designed customer-focused products from 3D-rendered NFTs to full web applications",
            ]}
          />
          <ExperienceItem
            title="Software Developer"
            company="Freelance Contracts"
            date="Feb 2020 - Nov 2021"
            description={[
              "Adapted to client requirements using Angular, React, Wix, GoDaddy, Google Firestore",
              "Built full-stack websites from design wireframes, offering up to 3 revisions",
              "Optimized website performance, reducing load times from 12s to 1-3s (90% faster) following Google's recommendations",
            ]}
          />
          <ExperienceItem
            title="Angular Developer"
            company="Proxify"
            date="Oct 2019 - Jan 2020"
            description={[
              "Fixed a critical production login issue, restoring full application functionality",
              "Developed and maintained Angular 5 frontend for a contractor job-finding platform",
            ]}
          />
          <ExperienceItem
            title="Junior Software Developer"
            company="Therigy"
            date="Feb 2018 - Apr 2019"
            description={[
              "Built user-centric web applications using AngularJS 1.6",
              "Maintained and upgraded three legacy software systems for specialty pharmacy prescription and appointment management",
              "Developed testing suites for Quality Assurance, boosting efficiency by 60%",
            ]}
          />
          <ExperienceItem
            title="Frontend Developer"
            company="Sky Pirates"
            date="Jan 2018 - Mar 2018"
            description={[
              "Developed and optimized an Angular 6+ frontend, achieving an 95% Google Lighthouse performance score",
              "Fostered an inclusive work environment training new skydivers",
            ]}
          />
        </div>
      </section>

      <section className="capabilities-section">
        <div className="resume-heading">
          <p className="eyebrow">Technical range</p>
          <h2>Broad enough to see the system. Deep enough to build it.</h2>
        </div>
        <div className="capability-grid">
          <div className="capability-card">
            <span>Languages</span>
            <p>
            JavaScript, TypeScript, Rust, Golang, Python, PHP
            </p>
          </div>
          <div className="capability-card">
            <span>Frontend systems</span>
            <p>
            HTML5, CSS3, React.js, Next.js, TailwindCSS, Bootstrap,
            Redux, Angular, AngularJS
            </p>
          </div>
          <div className="capability-card">
            <span>Backend &amp; data</span>
            <p>
            Node.js, Express.js, MongoDB, SQL, NoSQL, GraphQL, RESTful
            APIs, Google Firestore
            </p>
          </div>
          <div className="capability-card">
            <span>Cloud &amp; delivery</span>
            <p>AWS,
            Google Cloud (GCP), Firebase, CI/CD, Docker, Kubernetes,
            Serverless, UNIX, Linux, Turborepo</p>
          </div>
          <div className="capability-card capability-card-wide">
            <span>Specialties</span>
            <p>Microservices,
            Distributed Systems, Anthropic Prompting, Ollama Prompting,
            OpenAI Prompting, PWA, WebAssembly (WASM), Unreal Engine,
            Storybook, IPFS, Cardano (Blockchain), Wix, GoDaddy</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div>
          <p className="eyebrow">Independent project</p>
          <h2>Some(Scripting)</h2>
          <p>
            A Markdown-powered engineering journal and testing ground for ideas
            in Next.js, TypeScript, accessibility, developer tooling, and the
            occasional deep dive.
          </p>
        </div>
        <div className="project-links">
            <a
              href="https://github.com/ScriptAlchemist/just_in"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://www.somescripting.com"
              target="_blank"
              rel="noreferrer"
            >
              Visit the journal <ArrowUpRight aria-hidden="true" />
            </a>
        </div>
      </section>
      <p className="about-disclaimer">
        Opinions shared here are my own and do not represent any employer.
      </p>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  date,
  description,
}: {
  title: string;
  company: string;
  date: string;
  description: string[];
}) {
  return (
    <article className="experience-item">
      <div className="experience-title">
        <div>
          <h3>{company}</h3>
          <p>{title}</p>
        </div>
        <time>{date}</time>
      </div>
      <ul>
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
    </article>
  );
}
