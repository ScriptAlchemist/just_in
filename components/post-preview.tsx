import Link from "next/link";
import type Author from "../interfaces/author";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Link href={`/posts/${slug}`} className="">
      <div className="bg-[hsl(var(--card))]/80 dark:bg-[hsl(var(--card))]/80 p-4 border border-[hsl(var(--border))/0.4] rounded-2xl min-h-[340px] md:min-h-[400px] lg:min-h-[410px]">
        <div className="w-fit mx-auto">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <h3 className="text-lg leading-snug h-fit truncate-lines text-[hsl(var(--primary))]">
            {title}
          </h3>
          <div className="hidden md:flex mt-auto">
            <Avatar name={author.name} picture={author.picture} />
          </div>
          <div className="hidden sm:block text-xs font-thin tracking-tighter text-[hsl(var(--muted-foreground))]">
            <DateFormatter dateString={date} />
          </div>
          <p className="text-sm leading-relaxed truncate-lines text-[hsl(var(--foreground))]">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
