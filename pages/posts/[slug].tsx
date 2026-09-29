import { motion, useScroll } from "framer-motion";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import { usePostContext } from "../../context/PostContext";
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
  const { setCurrentPost } = usePostContext();

  useEffect(() => {
    if (post?.title && post?.slug) {
      setCurrentPost({ title: post.title, slug: post.slug });
    } else {
      setCurrentPost(null);
    }
  }, [post, setCurrentPost]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="article-page page-shell">
      <div className="article-shell">
        <motion.div
          className="article-progress"
          style={{ scaleY: scrollYProgress }}
        />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
                <meta name="twitter:image" content={post.ogImage.url} />
              </Head>
              <Link href="/#insights" className="article-back">
                <ArrowLeft aria-hidden="true" /> Back to the journal
              </Link>
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
    </div>
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
