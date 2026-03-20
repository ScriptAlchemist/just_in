"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { CopyIcon, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { usePostContext } from "../context/PostContext";
import { BackgroundGradient } from "./ui/backgroundGradiant";
import { Button } from "./ui/button";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about-me", label: "About Me" },
  { href: "/pdf-to-speech", label: "PDF to Speech" },
];

const utilitySurfaceClassName =
  "flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-[hsl(var(--background))]/90 text-[hsl(var(--foreground))] backdrop-blur-sm transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-14 sm:w-14";

type UtilityLinkButtonProps = {
  href: string;
  title: string;
  className?: string;
  children: React.ReactNode;
};

const UtilityLinkButton = ({
  href,
  title,
  className,
  children,
}: UtilityLinkButtonProps) => (
  <Link
    href={href}
    title={title}
    aria-label={title}
    className="group w-fit"
  >
    <BackgroundGradient
      className={cn(utilitySurfaceClassName, className)}
    >
      {children}
    </BackgroundGradient>
  </Link>
);

export const Navbar = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let currentPostContext;
  let recentPostContext;
  try {
    const context = usePostContext();
    currentPostContext = context.currentPost;
    recentPostContext = context.recentPost;

    if (!currentPostContext && typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path === "/about-me") {
        recentPostContext = recentPostContext || null;
      }
    }
  } catch {
    currentPostContext = null;
    recentPostContext = null;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      return;
    }

    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    if (typeof window === "undefined") return;

    const scriptingElement = document.querySelector(".scripting-text");

    if (isDark) {
      scriptingElement?.classList.add("text-[hsl(var(--destructive))]");
      setTimeout(
        () =>
          scriptingElement?.classList.remove(
            "text-[hsl(var(--destructive))]",
          ),
        800,
      );

      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
      return;
    }

    scriptingElement?.classList.add("text-[hsl(var(--accent))]");
    setTimeout(
      () =>
        scriptingElement?.classList.remove("text-[hsl(var(--accent))]"),
      800,
    );

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setIsDark(true);
  };

  const postToShow = currentPostContext || recentPostContext;
  const postUrl = postToShow?.slug
    ? `https://somescripting.com/posts/${postToShow.slug}`
    : null;

  const handleCopyClick = () => {
    if (!postUrl) return;

    navigator.clipboard.writeText(postUrl);
    toast.success("Copied post URL");
  };

  return (
    <header className="mb-6 w-full px-4 pt-6 sm:mb-8 sm:px-6 lg:px-8">
      <div
        className="navbar-shell mx-auto max-w-5xl"
        data-expanded={isMenuOpen ? "true" : "false"}
      >
        <div className="navbar-surface">
          <div className="navbar-top-row">
            <Link href="/" className="navbar-brand" onClick={closeMenu}>
              <span className="navbar-brand-mark font-bold">
                <span className="underline decoration-[hsl(var(--primary))]">
                  Some
                </span>
                <span className="text-[hsl(var(--destructive))]">
                  (
                </span>
                <span className="scripting-text transition-colors duration-300 underline decoration-[hsl(var(--primary))]">
                  Scripting
                </span>
                <span className="text-[hsl(var(--destructive))]">
                  )
                </span>
              </span>
              <span className="navbar-brand-subtitle">
                By Justin Bender
              </span>
            </Link>

            <div className="navbar-actions">
              <UtilityLinkButton
                href="https://www.linkedin.com/in/benderjustin"
                title="Visit Justin's LinkedIn"
                className="text-blue-500"
              >
                <IconBrandLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </UtilityLinkButton>

              <UtilityLinkButton
                href="https://twitter.com/ScriptAlchemist"
                title="Visit Justin's X profile"
              >
                <IconBrandX className="h-5 w-5 sm:h-6 sm:w-6" />
              </UtilityLinkButton>

              <UtilityLinkButton
                href="https://github.com/ScriptAlchemist"
                title="Visit Justin's GitHub"
                className="text-[hsl(var(--destructive))]"
              >
                <IconBrandGithub className="h-5 w-5 sm:h-6 sm:w-6" />
              </UtilityLinkButton>

              <Button
                variant="unstyled"
                size="icon"
                onClick={toggleTheme}
                title={
                  isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-label="Toggle theme"
                className="group h-auto w-auto p-0"
              >
                <BackgroundGradient
                  className={cn(
                    utilitySurfaceClassName,
                    "overflow-hidden",
                  )}
                >
                  {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-200 group-hover:rotate-12 sm:h-6 sm:w-6" />
                  ) : (
                    <Moon className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:-rotate-12 sm:h-6 sm:w-6" />
                  )}
                </BackgroundGradient>
              </Button>

              <button
                type="button"
                className="navbar-menu-button"
                aria-expanded={isMenuOpen}
                aria-controls="site-navigation-panel"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                {isMenuOpen ? (
                  <X aria-hidden="true" />
                ) : (
                  <Menu aria-hidden="true" />
                )}
                <span>{isMenuOpen ? "Close" : "Menu"}</span>
              </button>
            </div>
          </div>

          <div className="navbar-main" id="site-navigation-panel">
            <nav className="navbar-links" aria-label="Primary">
              {primaryLinks.map((item) => {
                const isActive = router.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    data-active={isActive ? "true" : "false"}
                    className="navbar-link"
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <section className="navbar-feature-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="navbar-feature-label">Current Post</p>
                  {postToShow ? (
                    <Link
                      href={`/posts/${postToShow.slug}`}
                      onClick={closeMenu}
                      className="mt-2 block min-w-0 truncate-lines text-base font-semibold leading-tight text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                      title={postToShow.title}
                    >
                      {postToShow.title}
                    </Link>
                  ) : (
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                      A recent article link will show up here.
                    </p>
                  )}
                </div>

                {postUrl ? (
                  <Button
                    type="button"
                    variant="unstyled"
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-200 hover:-translate-y-0.5"
                    onClick={handleCopyClick}
                    aria-label="Copy post URL"
                    title="Copy post URL"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>

              {postUrl ? (
                <code className="navbar-feature-url">{postUrl}</code>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </header>
  );
};
