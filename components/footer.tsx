import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";
import { BackgroundGradient } from "./ui/backgroundGradiant";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#moreStoriesHeading", label: "Post List" },
  { href: "/about-me", label: "About Me" },
  { href: "/pdf-to-speech", label: "PDF to Speech" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/benderjustin",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    className: "text-blue-500",
  },
  {
    href: "https://twitter.com/ScriptAlchemist",
    label: "X",
    icon: IconBrandX,
    className: "text-[hsl(var(--foreground))]",
  },
  {
    href: "https://github.com/ScriptAlchemist",
    label: "GitHub",
    icon: IconBrandGithub,
    className: "text-[hsl(var(--destructive))]",
  },
];

const Footer = () => {
  return (
    <footer className="w-full px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="footer-shell w-full">
        <div className="footer-surface">
          <div className="footer-grid">
            <div className="footer-brand-block">
              <Link href="/" className="footer-brand">
                <span className="footer-brand-mark font-bold">
                  <span className="underline decoration-[hsl(var(--primary))]">
                    Some
                  </span>
                  <span className="text-[hsl(var(--destructive))]">
                    (
                  </span>
                  <span className="underline decoration-[hsl(var(--primary))]">
                    Scripting
                  </span>
                  <span className="text-[hsl(var(--destructive))]">
                    )
                  </span>
                </span>
                <span className="footer-brand-subtitle">
                  By Justin Bender
                </span>
              </Link>

              <p className="footer-copy">
                Notes on frontend engineering, Rust, developer tools,
                and experiments that turn into real shipped work.
              </p>
            </div>

            <section className="footer-section">
              <p className="footer-eyebrow">Explore</p>
              <nav className="footer-link-list" aria-label="Footer">
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="footer-link"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </section>

            <section className="footer-section">
              <p className="footer-eyebrow">Elsewhere</p>
              <div className="footer-social-list">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Justin's ${item.label}`}
                      className="group w-fit"
                    >
                      <BackgroundGradient
                        className={`footer-social-button ${item.className}`}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </BackgroundGradient>
                    </Link>
                  );
                })}
              </div>
              <p className="footer-note">
                New posts land here first. Reach out on LinkedIn or
                GitHub if you want to talk shop.
              </p>
            </section>
          </div>

          <div className="footer-bottom">
            <p className="footer-meta">
              Built with Next.js and Tailwind CSS.
            </p>
            <p className="footer-meta">
              © {new Date().getFullYear()} Justin Bender
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
