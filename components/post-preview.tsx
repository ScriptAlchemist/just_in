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
      <div className="bg-white/80 dark:bg-black/80 p-4 border border-foreground/40 rounded-2xl min-h-[340px] md:min-h-[400px] lg:min-h-[410px]">
        <div className="w-fit mx-auto">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <h3 className="text-lg leading-snug h-fit truncate-lines">
            {title}
          </h3>
          <div className="hidden md:flex mt-auto">
            <Avatar name={author.name} picture={author.picture} />
          </div>
          <div className="hidden sm:block text-xs font-thin tracking-tighter">
            <DateFormatter dateString={date} />
          </div>
          <p className="text-sm leading-relaxed truncate-lines">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
