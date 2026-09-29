import { AppProps } from "next/app";
import { Toaster } from "sonner";
import Layout from "../components/layout";
import { PostProvider } from "../context/PostContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider>
      <div className="site-root">
        <Layout>
          <Component {...pageProps} />
          <Toaster richColors position="bottom-right" />
        </Layout>
      </div>
    </PostProvider>
  );
}
