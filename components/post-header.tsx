import type Author from "../interfaces/author";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <header className="article-header">
      <div className="article-kicker">Some(Scripting) / Engineering journal</div>
      <PostTitle>{title}</PostTitle>
      <div className="article-byline">
        <Avatar name={author.name} picture={author.picture} />
        <span aria-hidden="true" />
        <time>
          <DateFormatter dateString={date} />
        </time>
      </div>
      <div className="article-cover">
        <CoverImage title={title} src={coverImage} />
      </div>
    </header>
  );
};

export default PostHeader;
