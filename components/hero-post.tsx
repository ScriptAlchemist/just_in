import Link from "next/link";
import type Author from "../interfaces/author";
import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import { BackgroundGradient } from "./ui/backgroundGradiant";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className="flex justify-center">
      <section className="lg:mr-32 rotate-3 flex flex-col lg:flex-row items-center justify-center rounded-xl lg:w-3/5">
        <Link href={`/posts/${slug}`} className="">
          <BackgroundGradient className="text-[hsl(var(--foreground))]">
            <div className="p-6 md:gap-x-16 lg:gap-x-8 flex-grow bg-[hsl(var(--background))] bg-grid-black/[0.1] dark:bg-[hsl(var(--card))] dark:bg-grid-white/[0.1] rounded-3xl text-[hsl(var(--foreground))] dark:text-[hsl(var(--card-foreground))]">
              <div>
                <h3 className="mb-4 text-2xl lg:text-3xl leading-tight">
                  {title}
                </h3>
                <div className="mb-4 md:mb-0 text-sm text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted))]">
                  <DateFormatter dateString={date} />
                </div>
              </div>
              <div>
                <p className="text-sm leading-relaxed mb-4 text-[hsl(var(--foreground))] dark:text-[hsl(var(--card-foreground))]">
                  {excerpt}
                </p>
                <Avatar name={author.name} picture={author.picture} />
              </div>
            </div>
          </BackgroundGradient>
        </Link>
      </section>
    </div>
  );
};

export default HeroPost;
