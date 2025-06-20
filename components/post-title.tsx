import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-10 text-center">
      {children}
    </h1>
  );
};

export default PostTitle;
