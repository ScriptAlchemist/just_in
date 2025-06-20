import Footer from "./footer";
import Meta from "./meta";
import { Navbar } from "./navbar";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col w-full">
        {/*<Alert preview={preview} />*/}
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
