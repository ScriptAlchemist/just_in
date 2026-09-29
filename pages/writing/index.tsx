import PageMeta from "../../components/page-meta";
import HeroPost from "../../components/hero-post";
import MoreStories from "../../components/more-stories";
import type Post from "../../interfaces/post";
import { getAllPosts } from "../../lib/api";

type Props = {
  allPosts: Post[];
};

export default function Writing({ allPosts }: Props) {
  const latestPost = allPosts[0];
  const archivePosts = allPosts.slice(1);

  return (
    <>
      <PageMeta
        title="Writing | Some(Scripting)"
        description="Engineering notes on frontend architecture, Rust, AI workflows, developer tooling, and building reliable software."
        path="/writing"
        image={latestPost?.ogImage?.url || latestPost?.coverImage}
        imageAlt={latestPost ? `Cover image for ${latestPost.title}` : undefined}
      />
      <main className="writing-page page-shell">
        <header className="directory-header">
          <p className="eyebrow">Some(Scripting) journal</p>
          <h1>Writing from the workbench.</h1>
          <p>
            Field notes on frontend architecture, Rust, developer tooling, AI,
            and the decisions that make software easier to evolve.
          </p>
        </header>

        {latestPost ? (
          <HeroPost
            title={latestPost.title}
            coverImage={latestPost.coverImage}
            date={latestPost.date}
            author={latestPost.author}
            slug={latestPost.slug}
            excerpt={latestPost.excerpt}
          />
        ) : null}

        {archivePosts.length > 0 ? (
          <MoreStories posts={archivePosts} />
        ) : null}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "ogImage",
  ]);

  return {
    props: { allPosts },
  };
};
