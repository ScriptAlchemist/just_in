import { AppProps } from "next/app";
import Layout from "../components/layout";
import { PostProvider } from "../context/PostContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider>
      <div className="flex h-fit justify-center w-full bg-[hsl(var(--background))] bg-grid-yellow-800/10 dark:bg-[hsl(var(--background))] dark:bg-grid-gray-100/[0.1] transition-colors duration-500">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </PostProvider>
  );
}
