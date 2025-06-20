import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 text-[hsl(var(--foreground))]">
      <Link
        href="/"
        className="border border-[hsl(var(--primary))] hover:border-[hsl(var(--destructive))] rounded-xl bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))] p-4 text-center justify-center flex"
        legacyBehavior
      >
        {"<-"} Home
      </Link>
    </h2>
  );
};

export default Header;
