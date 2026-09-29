import {
  ArrowRight,
  Bot,
  Braces,
  Gauge,
  Layers3,
  Network,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroPost from "../components/hero-post";
import HomeHero from "../components/home-hero";
import PageMeta from "../components/page-meta";
import Reveal from "../components/reveal";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";
import JustinImg from "../public/assets/blog/authors/skydiver_justin.jpeg";

type Props = {
  allPosts: Post[];
};

const services = [
  {
    icon: Braces,
    number: "01",
    title: "Product engineering",
    copy: "Move from unclear requirements to a working product with one partner across discovery, architecture, interface, and delivery.",
    detail: "React · Next.js · TypeScript · APIs",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Frontend systems",
    copy: "Unify interfaces, component libraries, and delivery patterns so multiple products can move faster without drifting apart.",
    detail: "Design systems · Storybook · Monorepos",
  },
  {
    icon: Bot,
    number: "03",
    title: "AI-enabled workflows",
    copy: "Build practical AI into products and engineering workflows with review, correction, and accountability designed in.",
    detail: "Agents · Prompt systems · Integration",
  },
];

const impactStories = [
  {
    icon: Gauge,
    number: "01",
    label: "CI/CD performance",
    metric: "2 min → ~1.1s",
    title: "Storybook builds in seconds.",
    copy: "Reworked the Storybook CI/CD pipeline, reducing manager builds to 1.06 seconds and preview builds to 1.15 seconds from roughly two minutes.",
    visual: "performance",
  },
  {
    icon: Layers3,
    number: "02",
    label: "Shared frontend system",
    metric: "3+ applications",
    title: "One foundation, less drift.",
    copy: "Built reusable React components and Storybook libraries in a Turborepo that support multiple product surfaces.",
    visual: "system",
  },
  {
    icon: Network,
    number: "03",
    label: "Agentic delivery",
    metric: "Human reviewed",
    title: "AI with a correction loop.",
    copy: "Designed development prompts and project blueprints that keep generated work reviewable, correctable, and tied to intent.",
    visual: "workflow",
  },
];

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];

  return (
    <>
      <PageMeta
        title="Some(Scripting) | Product Engineering and Journal"
        description="Independent product engineering for teams that need clear technical decisions, hands-on delivery, and software built to keep evolving."
        path="/"
      />

      <div className="home-page">
        <HomeHero />

        <section id="services" className="services-section page-shell">
        <Reveal className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Where I help</p>
            <h2>Senior engineering where the path is not obvious.</h2>
          </div>
          <p>
            Bring me in when a product needs momentum, the system needs a
            rethink, or a difficult technical bet needs hands-on leadership.
          </p>
        </Reveal>

        <Reveal className="service-grid" delay={0.08}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="service-card">
                <div className="service-card-top">
                  <span>{service.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <div className="service-detail">{service.detail}</div>
              </article>
            );
          })}
        </Reveal>
        </section>

        <section className="impact-section page-shell">
          <Reveal className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Selected impact</p>
              <h2>Proof in the shape of better systems.</h2>
            </div>
            <p>
              The work is measured by what becomes faster, clearer, and easier
              for the team to carry forward.
            </p>
          </Reveal>
          <Reveal className="impact-grid" delay={0.08}>
            {impactStories.map((story) => {
              const Icon = story.icon;
              return (
                <article key={story.number} className="impact-card">
                  <div className="impact-card-top">
                    <span>{story.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <div className={`impact-visual impact-visual-${story.visual}`} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="impact-label">{story.label}</p>
                  <strong className="impact-metric">{story.metric}</strong>
                  <h3>{story.title}</h3>
                  <p>{story.copy}</p>
                </article>
              );
            })}
          </Reveal>
        </section>

        <section className="principles-section page-shell">
        <Reveal className="principles-panel">
          <p className="eyebrow eyebrow-light">How I work</p>
          <blockquote>
            “Good consulting should leave you with more than working code. It
            should leave your team with sharper decisions and a system they can
            keep evolving.”
          </blockquote>
          <div className="principle-list">
            <span>Clear tradeoffs</span>
            <span>Small, testable releases</span>
            <span>Human-reviewed AI</span>
            <span>Maintainable handoff</span>
          </div>
        </Reveal>
        </section>

        <section id="insights" className="insights-section page-shell">
        <Reveal className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Some(Scripting) journal</p>
            <h2>Notes from the workbench.</h2>
          </div>
          <p>
            Detailed explorations of frontend architecture, Rust, developer
            tooling, AI, and the small decisions behind reliable software.
          </p>
        </Reveal>

        {heroPost ? (
          <Reveal delay={0.08}>
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          </Reveal>
        ) : null}
        <div className="writing-cta">
          <Link href="/writing" className="button button-secondary">
            Browse all writing <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        </section>

        <section className="about-preview page-shell">
        <Reveal className="about-preview-image">
          <Image
            src={JustinImg}
            alt="Justin Bender skydiving"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          <span>Engineering with altitude</span>
        </Reveal>
        <Reveal className="about-preview-copy" delay={0.08}>
          <p className="eyebrow">Meet your consultant</p>
          <h2>Builder first. Translator always.</h2>
          <p>
            I&apos;m Justin Bender, a software engineer who has worked across
            product teams, consulting engagements, design systems, legacy
            applications, blockchain products, and AI-assisted development.
          </p>
          <p>
            I care about making difficult technical work understandable, so the
            people building, funding, and using the product can move together.
          </p>
          <Link href="/about-me" className="text-link">
            See my experience <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
