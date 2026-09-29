import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Layers3,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import PageMeta from "../components/page-meta";
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
    copy: "Turn a fuzzy brief into a production-ready product with a clear technical path, thoughtful UX, and dependable delivery.",
    detail: "React · Next.js · TypeScript · APIs",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Frontend systems",
    copy: "Create reusable interfaces and shared foundations that help multiple applications move faster without drifting apart.",
    detail: "Design systems · Storybook · Monorepos",
  },
  {
    icon: Bot,
    number: "03",
    title: "AI-enabled workflows",
    copy: "Add practical AI capabilities to real products and engineering workflows, with human review built into the system.",
    detail: "Agents · Prompt systems · Integration",
  },
];

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <PageMeta
        title="Some(Scripting) | Product Engineering and Journal"
        description="Independent product engineering for teams building ambitious web products, frontend systems, and practical AI workflows."
        path="/"
      />

      <section className="home-hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">Independent software consulting</p>
          <h1>
            Complex software,
            <span>made clear.</span>
          </h1>
          <p className="hero-intro">
            I help teams turn ambitious ideas and tangled systems into useful,
            resilient products, combining product judgment with hands-on
            engineering.
          </p>
          <div className="hero-actions">
            <Link
              href="https://www.linkedin.com/in/benderjustin"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Discuss a project <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/#insights" className="button button-secondary">
              Read the journal <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <dl className="hero-proof" aria-label="Experience highlights">
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
          </dl>
        </div>

        <div className="hero-method" aria-label="Consulting process">
          <div className="method-heading">
            <span>From ambiguity to release</span>
            <Wrench aria-hidden="true" />
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Frame the real problem</strong>
                <p>Align the product need, constraints, and right-sized scope.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Build the useful core</strong>
                <p>Make the riskiest decisions visible and ship working software.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Leave a stronger system</strong>
                <p>Document the thinking and reduce the cost of what comes next.</p>
              </div>
            </li>
          </ol>
          <div className="method-note">
            <span className="status-dot" aria-hidden="true" />
            Available for focused consulting engagements
          </div>
        </div>
      </section>

      <section id="services" className="services-section page-shell">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Where I help</p>
            <h2>Senior engineering for work that needs momentum.</h2>
          </div>
          <p>
            Bring me in when the product matters, the path is not obvious, and
            the solution has to hold up after launch.
          </p>
        </div>

        <div className="service-grid">
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
        </div>
      </section>

      <section className="principles-section page-shell">
        <div className="principles-panel">
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
        </div>
      </section>

      <section id="insights" className="insights-section page-shell">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Some(Scripting) journal</p>
            <h2>Notes from the workbench.</h2>
          </div>
          <p>
            Detailed explorations of frontend architecture, Rust, developer
            tooling, AI, and the small decisions behind reliable software.
          </p>
        </div>

        {heroPost ? (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        ) : null}

        {morePosts.length > 0 ? <MoreStories posts={morePosts} /> : null}
      </section>

      <section className="about-preview page-shell">
        <div className="about-preview-image">
          <Image
            src={JustinImg}
            alt="Justin Bender skydiving"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          <span>Engineering with altitude</span>
        </div>
        <div className="about-preview-copy">
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
        </div>
      </section>
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
