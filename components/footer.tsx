import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/about-me", label: "About Me" },
  { href: "/tooling", label: "Tooling" },
  { href: "/tooling/pdf-to-speech", label: "PDF to Speech" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/benderjustin",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
  },
  {
    href: "https://github.com/ScriptAlchemist",
    label: "GitHub",
    icon: IconBrandGithub,
  },
  {
    href: "https://twitter.com/ScriptAlchemist",
    label: "X",
    icon: IconBrandX,
  },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-lead">
          <p className="eyebrow eyebrow-light">Have a complex build?</p>
          <h2>Let&apos;s make the next release feel inevitable.</h2>
          <p>
            I help teams move from product ambiguity to dependable software, with
            clear decisions, durable interfaces, and less engineering drag.
          </p>
          <Link
            href="https://www.linkedin.com/in/benderjustin"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-inverse"
          >
            Start a conversation <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-navigation">
          <div>
            <p className="footer-label">Navigate</p>
            <nav aria-label="Footer navigation">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="footer-label">Find me</p>
            <div className="footer-socials">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Justin on ${item.label}`}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Some(Scripting) is the independent engineering journal of Justin
            Bender.
          </p>
          <p>© {new Date().getFullYear()} Justin Bender</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
