import { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-fit justify-center w-full bg-white bg-grid-indigo-800/[0.3] dark:bg-black dark:bg-grid-indigo-800/[0.3]">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
