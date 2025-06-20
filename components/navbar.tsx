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
        scriptingElement.classList.add("text-indigo-500");
        setTimeout(
          () => scriptingElement.classList.remove("text-indigo-500"),
          800,
        );
      }
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      if (scriptingElement) {
        scriptingElement.classList.add("text-red-600");
        setTimeout(
          () => scriptingElement.classList.remove("text-red-600"),
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
                <span className="underline decoration-indigo-500">
                  Some
                </span>
                <span className="text-red-500">(</span>
                <span className="transition-colors duration-300 scripting-text underline decoration-indigo-500">
                  Scripting
                </span>
                <span className="text-red-500">)</span>
                <div className="text-sm tracking-wider">
                  By Justin Bender
                </div>
              </h1>
            </Link>
            <div className="flex flex-wrap justify-center text-center w-full gap-4 text-lg mt-5 md:mt-0 items-center">
              <Link
                title="Visit Justins LinkedIn"
                href="https://www.linkedin.com/in/benderjustin"
                className="text-blue-500 group w-fit mx-auto"
              >
                <BackgroundGradient className="transition-colors duration-300 px-3 bg-white dark:bg-black text-white rounded-3xl flex items-center gap-x-2">
                  <IconBrandLinkedin className="w-5 h-5 md:w-8 md:h-8 text-blue-700 m-3 group-hover:text-blue-500" />
                </BackgroundGradient>
              </Link>
              <Link
                title="Visit Justins Twitter or X"
                href="https://twitter.com/ScriptAlchemist"
                className="group w-fit mx-auto"
              >
                <BackgroundGradient className="transition-colors duration-500 px-3 bg-white dark:bg-black text-white rounded-3xl flex items-center gap-x-2">
                  <svg
                    viewBox="0 0 1200 1227"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="none"
                    className="fill-stone-800 dark:fill-stone-300 w-5 h-5 md:w-8 md:h-8 m-3 group-hover:fill-stone-300 dark:group-hover:fill-stone-100"
                  >
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
                  </svg>
                </BackgroundGradient>
              </Link>
              <Link
                title="Visit Justins Github"
                href="https://github.com/ScriptAlchemist"
                className="group w-fit mx-auto"
              >
                <BackgroundGradient className="transition-colors duration-700 px-3 bg-white dark:bg-black text-white rounded-3xl flex items-center gap-x-2">
                  <IconBrandGithub className="w-5 h-5 md:w-8 md:h-8 text-orange-700 m-3 group-hover:text-orange-500" />
                </BackgroundGradient>
              </Link>
              <Button
                variant="unstyled"
                size="icon"
                onClick={toggleTheme}
                title={
                  isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-label="Toggle Dark Mode"
                className="transition-colors w-fit mx-auto"
              >
                <BackgroundGradient className="transition-colors duration-1000 px-3 bg-white dark:bg-black text-white rounded-3xl flex items-center gap-x-2">
                  {isDark ? (
                    <Sun className="text-yellow-400 w-5 h-5 md:w-8 md:h-8 m-3 hover:text-gray-500" />
                  ) : (
                    <Moon className="text-gray-400 w-5 h-5 md:w-8 md:h-8 m-3 hover:text-yellow-500" />
                  )}
                </BackgroundGradient>
              </Button>
            </div>
          </div>
        </section>
        <NavigationMenuList className="flex">
          <div className="flex flex-row w-full max-w-screen-lg mx-5 sm:mx-20 mt-5 gap-x-3 gap-y-4 sm:gap-x-8">
            {router.pathname !== "/" && (
              <NavigationMenuItem className="flex-1">
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={router.pathname === "/"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {router.pathname !== "/about-me" && (
              <NavigationMenuItem className="flex-1">
                <Link href="/about-me" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={router.pathname === "/about-me"}
                    className={navigationMenuTriggerStyle()}
                  >
                    About me
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
