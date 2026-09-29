import Head from "next/head";
import {
  CMS_NAME,
  DEFAULT_DESCRIPTION,
  SITE_AUTHOR,
  TWITTER_HANDLE,
} from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <title>{CMS_NAME} | Product Engineering and Journal</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/assets/brand/some-scripting-mark.svg"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#0b1727" />
      <meta key="description" name="description" content={DEFAULT_DESCRIPTION} />
      <meta key="author" name="author" content={SITE_AUTHOR} />
      <meta key="robots" name="robots" content="index, follow" />
      <meta key="og-type" property="og:type" content="website" />
      <meta key="og-site-name" property="og:site_name" content={CMS_NAME} />
      <meta key="og-locale" property="og:locale" content="en_US" />
      <meta key="og-title" property="og:title" content={CMS_NAME} />
      <meta
        key="og-description"
        property="og:description"
        content={DEFAULT_DESCRIPTION}
      />
      <meta key="twitter-card" name="twitter:card" content="summary" />
      <meta key="twitter-site" name="twitter:site" content={TWITTER_HANDLE} />
      <meta
        key="twitter-creator"
        name="twitter:creator"
        content={TWITTER_HANDLE}
      />
      <meta key="twitter-title" name="twitter:title" content={CMS_NAME} />
      <meta
        key="twitter-description"
        name="twitter:description"
        content={DEFAULT_DESCRIPTION}
      />
    </Head>
  );
};

export default Meta;
