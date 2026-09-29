import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type Author from "../interfaces/author";
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
    <Link href={`/posts/${slug}`} className="journal-card group">
      <div>
        <div className="journal-card-image">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <div className="journal-card-copy">
          <div className="post-meta">
            <DateFormatter dateString={date} />
          </div>
          <h3 className="truncate-lines">
            {title}
          </h3>
          <p className="truncate-lines">{excerpt}</p>
          <div className="journal-card-footer">
            <span>{author.name}</span>
            <ArrowUpRight aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
