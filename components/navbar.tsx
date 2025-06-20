"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "./ui/backgroundGradiant";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigationMenu";

export const Navbar = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isHoveringTheme, setIsHoveringTheme] = useState(false);

  // On mount check localStorage and system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      } else if (savedTheme === "light") {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
      } else {
        // No saved theme, check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setIsDark(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;

    const scriptingElement = document.querySelector(".scripting-text");

    if (isDark) {
      if (scriptingElement) {
        scriptingElement.classList.add(
          "text-[hsl(var(--destructive))]",
        );
        setTimeout(
          () =>
            scriptingElement.classList.remove(
              "text-[hsl(var(--destructive))]",
            ),
          800,
        );
      }
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      if (scriptingElement) {
        scriptingElement.classList.add("text-[hsl(var(--accent))]");
        setTimeout(
          () =>
            scriptingElement.classList.remove(
              "text-[hsl(var(--accent))]",
            ),
          800,
        );
      }
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      <NavigationMenu className="flex flex-col w-full">
        <section className="flex flex-col">
          <div className="flex flex-col sm:flex-row items-center md:justify-around mt-8 max-w-5xl w-full sm:w-5/6 mx-auto ">
            <Link href="/">
              <h1 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
                {" "}
                <span className="underline decoration-[hsl(var(--primary))]">
                  Some
                </span>
                <span className="text-[hsl(var(--destructive))]">
                  (
                </span>
                <span className="transition-colors duration-300 scripting-text underline decoration-[hsl(var(--primary))]">
                  Scripting
                </span>
                <span className="text-[hsl(var(--destructive))]">
                  )
                </span>
                <div className="text-sm tracking-wider text-[hsl(var(--foreground))]">
                  By Justin Bender
                </div>
              </h1>
            </Link>
            <div className="grid grid-cols-2 grid-rows-2 gap-10 max-w-max mt-5 md:mt-0 lg:grid-cols-4 lg:grid-rows-1 mx-auto justify-center items-center text-center text-lg">
              <Link
                title="Visit Justins LinkedIn"
                href="https://www.linkedin.com/in/benderjustin"
                className="group w-fit mx-auto text-[hsl(var(--accent))]"
              >
                <BackgroundGradient className="transition-colors duration-300 px-3 bg-[hsl(var(--background))] dark:bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-3xl flex items-center gap-x-2">
                  <IconBrandLinkedin className="w-5 h-5 md:w-8 md:h-8 text-blue-400 m-3 group-hover:text-blue-700" />
                </BackgroundGradient>
              </Link>
              <Link
                title="Visit Justins Twitter or X"
                href="https://twitter.com/ScriptAlchemist"
                className="group w-fit mx-auto"
              >
                <BackgroundGradient className="transition-colors duration-500 px-3 bg-[hsl(var(--background))] dark:bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-3xl flex items-center gap-x-2">
                  <svg
                    viewBox="0 0 1200 1227"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="none"
                    className="fill-[hsl(var(--foreground))] dark:fill-[hsl(var(--card-foreground))] group-hover:fill-white dark:group-hover:fill-black w-5 h-5 md:w-8 md:h-8 m-3"
                  >
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
                  </svg>
                </BackgroundGradient>
              </Link>
              <Link
                title="Visit Justins Github"
                href="https://github.com/ScriptAlchemist"
                className="group w-fit mx-auto text-[hsl(var(--accent))]"
              >
                <BackgroundGradient className="transition-colors duration-700 px-3 bg-[hsl(var(--background))] dark:bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-3xl flex items-center gap-x-2">
                  <IconBrandGithub className="w-5 h-5 md:w-8 md:h-8 text-[hsl(var(--destructive))] m-3 group-hover:text-[hsl(var(--muted))]" />
                </BackgroundGradient>
              </Link>
              <Button
                variant="unstyled"
                size="icon"
                onClick={toggleTheme}
                onMouseEnter={() => setIsHoveringTheme(true)}
                onMouseLeave={() => setIsHoveringTheme(false)}
                title={
                  isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-label="Toggle Dark Mode"
                className="relative w-fit mx-auto text-[hsl(var(--foreground))] p-0"
              >
                <BackgroundGradient className="transition-colors duration-1000 px-3 bg-[hsl(var(--background))] dark:bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-3xl flex items-center justify-center w-16 h-11 md:w-20 md:h-14 overflow-hidden relative">
                  {/* Wrapper for stacking icons */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Sun
                      className={`absolute w-5 h-5 md:w-8 md:h-8 text-yellow-400 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                        !isDark && !isHoveringTheme
                          ? "opacity-100 scale-100 z-20"
                          : "opacity-0 scale-50 z-0 pointer-events-none"
                      }`}
                      aria-hidden="true"
                    />
                    <Sun
                      className={`absolute w-5 h-5 md:w-8 md:h-8 text-yellow-400 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                        isDark && isHoveringTheme
                          ? "opacity-100 scale-100 z-20"
                          : "opacity-0 scale-50 z-0 pointer-events-none"
                      }`}
                      aria-hidden="true"
                    />
                    <Moon
                      className={`absolute w-5 h-5 md:w-8 md:h-8 text-gray-400 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                        isDark && !isHoveringTheme
                          ? "opacity-100 scale-100 z-20"
                          : "opacity-0 scale-50 z-0 pointer-events-none"
                      }`}
                      aria-hidden="true"
                    />
                    <Moon
                      className={`absolute w-5 h-5 md:w-8 md:h-8 text-gray-400 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                        !isDark && isHoveringTheme
                          ? "opacity-100 scale-100 z-20"
                          : "opacity-0 scale-50 z-0 pointer-events-none"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </BackgroundGradient>
              </Button>
            </div>
          </div>
        </section>
        <NavigationMenuList className="flex flex-wrap sm:justify-start gap-8 px-14 max-w-5xl mt-14 sm:mt-10 mx-auto">
          {/* {router.pathname !== "/" && ( */}
          <NavigationMenuItem className="w-fit">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                active={router.pathname === "/"}
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* )}
          {router.pathname !== "/about-me" && ( */}
          <NavigationMenuItem className="w-fit">
            <Link href="/about-me" legacyBehavior passHref>
              <NavigationMenuLink
                active={router.pathname === "/about-me"}
                className={navigationMenuTriggerStyle()}
              >
                About Me
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* )} */}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
