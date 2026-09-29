import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type Author from "../interfaces/author";
import DateFormatter from "./date-formatter";

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
    <article className="featured-post">
      <Link href={`/posts/${slug}`} className="featured-post-image">
        <Image
          src={coverImage}
          alt=""
          width={900}
          height={560}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span>Latest insight</span>
      </Link>
      <div className="featured-post-copy">
        <div className="post-meta">
          <span>{author.name}</span>
          <span aria-hidden="true">/</span>
          <time>
            <DateFormatter dateString={date} />
          </time>
        </div>
        <h3>
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h3>
        <p>{excerpt}</p>
        <Link href={`/posts/${slug}`} className="text-link">
          Read the article <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default HeroPost;
