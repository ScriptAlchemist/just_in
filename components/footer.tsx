import {
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row items-center justify-between text-[hsl(var(--foreground))] max-w-screen-lg mx-auto">
          <nav className="mb-6 lg:mb-0 flex gap-x-6 text-lg font-semibold tracking-tight">
            <Link
              href="/"
              className="hover:text-[hsl(var(--destructive))] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about-me"
              className="hover:text-[hsl(var(--destructive))] transition-colors"
            >
              About Me
            </Link>
          </nav>
          <div className="flex gap-x-8 text-xl">
            <Link
              href="https://www.linkedin.com/in/benderjustin"
              aria-label="Justin's LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 text-blue-400 transition-colors"
            >
              <IconBrandLinkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com/ScriptAlchemist"
              aria-label="Justin's Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 text-[hsl(var(--foreground))] transition-colors"
            >
              <svg
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-5 h-5 fill-[hsl(var(--foreground))] hover:fill-blue-400 transition-colors"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
              </svg>
            </Link>
            <Link
              href="https://github.com/ScriptAlchemist"
              aria-label="Justin's Github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--foreground))] text-[hsl(var(--destructive))] transition-colors"
            >
              <IconBrandGithub className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
