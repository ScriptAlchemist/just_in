import { motion, useScroll } from "framer-motion";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PageMeta, { toAbsoluteUrl } from "../../components/page-meta";
import PostTitle from "../../components/post-title";
import { usePostContext } from "../../context/PostContext";
import type PostType from "../../interfaces/post";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { CMS_NAME, SITE_AUTHOR, SITE_URL } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const title = `${post.title} | ${CMS_NAME}`;
  const description = post.excerpt?.replace(/\s+/g, " ").trim();
  const path = `/posts/${post.slug}`;
  const socialImage = post.ogImage?.url || post.coverImage;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: socialImage ? [toAbsoluteUrl(socialImage)] : undefined,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author?.name || SITE_AUTHOR,
      url: `${SITE_URL}/about-me`,
    },
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    mainEntityOfPage: toAbsoluteUrl(path),
    isPartOf: {
      "@type": "Blog",
      name: CMS_NAME,
      url: SITE_URL,
    },
  };
  const { setCurrentPost } = usePostContext();

  useEffect(() => {
    if (post?.title && post?.slug) {
      setCurrentPost({ title: post.title, slug: post.slug });
    } else {
      setCurrentPost(null);
    }

    return () => setCurrentPost(null);
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
              <PageMeta
                title={title}
                description={description}
                path={path}
                image={socialImage}
                imageAlt={`Cover image for ${post.title}`}
                type="article"
                publishedTime={post.date}
              />
              <Head>
                <script
                  key="article-json-ld"
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd).replace(
                      /</g,
                      "\\u003c",
                    ),
                  }}
                />
              </Head>
              <Link href="/writing" className="article-back">
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
    "excerpt",
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
