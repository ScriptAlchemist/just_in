import { motion, useScroll } from "framer-motion";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import type PostType from "../../interfaces/post";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const title = `${post.title} | Justin Bender post on ${CMS_NAME}`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Container>
      <div className="-mx-5 rounded-xl sm:mx-auto flex flex-col bg-[hsl(var(--background))]/70 dark:bg-[hsl(var(--background))]/80 mt-5 md:mt-10 transition-colors duration-700 p-4">
        <motion.div
          className="fixed top-0 left-0 bottom-0 w-[1px] md:w-[4px] bg-[hsl(var(--accent))] origin-top"
          style={{ scaleY: scrollYProgress }}
        />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
                <meta name="twitter:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </div>
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
