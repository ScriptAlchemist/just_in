"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { ArrowUpRight, Copy, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePostContext } from "../context/PostContext";

const primaryLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#insights", label: "Insights" },
  { href: "/about-me", label: "About" },
  { href: "/pdf-to-speech", label: "PDF Reader" },
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

export const Navbar = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPost } = usePostContext();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldUseDark = savedTheme
      ? savedTheme === "dark"
      : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  const isArticlePage = router.pathname === "/posts/[slug]";
  const postUrl = isArticlePage && currentPost?.slug
    ? `https://somescripting.com/posts/${currentPost.slug}`
    : null;

  const handleCopyClick = () => {
    if (!postUrl) return;
    navigator.clipboard.writeText(postUrl);
    toast.success("Article link copied");
  };

  return (
    <header className="site-header">
      <div className="site-nav-wrap">
        <Link
          href="/"
          className="site-brand"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Some(Scripting), home"
        >
          <span className="site-brand-logo" aria-hidden="true">
            <img
              src="/assets/brand/some-scripting-mark.svg"
              alt=""
              width="176"
              height="56"
            />
          </span>
          <span className="site-brand-copy">
            <span className="site-brand-name">Some(Scripting)</span>
            <span className="site-brand-role">
              Product engineering + journal
            </span>
          </span>
        </Link>

        <nav className="site-nav-links" aria-label="Primary navigation">
          {primaryLinks.map((item) => {
            const isActive = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="site-nav-link"
                data-active={isActive ? "true" : "false"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-nav-actions">
          {postUrl ? (
            <button
              type="button"
              onClick={handleCopyClick}
              className="site-icon-button hidden sm:inline-flex"
              aria-label="Copy current article link"
              title="Copy current article link"
            >
              <Copy aria-hidden="true" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggleTheme}
            className="site-icon-button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <Link
            href="https://www.linkedin.com/in/benderjustin"
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-cta"
          >
            Let&apos;s talk <ArrowUpRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="site-menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-site-navigation"
        className="mobile-site-nav"
        data-open={isMenuOpen ? "true" : "false"}
      >
        <nav aria-label="Mobile navigation" className="mobile-site-links">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="mobile-social-links">
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
              </Link>
            );
          })}
          {postUrl ? (
            <button type="button" onClick={handleCopyClick}>
              <Copy aria-hidden="true" />
              <span>Copy article link</span>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
