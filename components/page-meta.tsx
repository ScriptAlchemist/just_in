import Head from "next/head";
import {
  CMS_NAME,
  SITE_AUTHOR,
  SITE_URL,
  TWITTER_HANDLE,
} from "../lib/constants";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export const toAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export default function PageMeta({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
}: PageMetaProps) {
  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = image ? toAbsoluteUrl(image) : null;

  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="author" name="author" content={SITE_AUTHOR} />
      <link key="canonical" rel="canonical" href={canonicalUrl} />

      <meta key="og-type" property="og:type" content={type} />
      <meta key="og-site-name" property="og:site_name" content={CMS_NAME} />
      <meta key="og-locale" property="og:locale" content="en_US" />
      <meta key="og-title" property="og:title" content={title} />
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta key="og-url" property="og:url" content={canonicalUrl} />

      <meta
        key="twitter-card"
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta key="twitter-site" name="twitter:site" content={TWITTER_HANDLE} />
      <meta
        key="twitter-creator"
        name="twitter:creator"
        content={TWITTER_HANDLE}
      />
      <meta key="twitter-title" name="twitter:title" content={title} />
      <meta
        key="twitter-description"
        name="twitter:description"
        content={description}
      />

      {imageUrl ? (
        <>
          <meta key="og-image" property="og:image" content={imageUrl} />
          <meta
            key="og-image-alt"
            property="og:image:alt"
            content={imageAlt || title}
          />
          <meta
            key="twitter-image"
            name="twitter:image"
            content={imageUrl}
          />
          <meta
            key="twitter-image-alt"
            name="twitter:image:alt"
            content={imageAlt || title}
          />
        </>
      ) : null}

      {type === "article" && publishedTime ? (
        <meta
          key="article-published-time"
          property="article:published_time"
          content={publishedTime}
        />
      ) : null}
      {type === "article" ? (
        <meta
          key="article-author"
          property="article:author"
          content={`${SITE_URL}/about-me`}
        />
      ) : null}
    </Head>
  );
}
