import { createContext, ReactNode, useContext, useState } from "react";

export type PostInfo = {
  title: string;
  slug: string;
} | null;

type PostContextType = {
  currentPost: PostInfo;
  setCurrentPost: (post: PostInfo) => void;
  recentPost: PostInfo;
  setRecentPost: (post: PostInfo) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [currentPost, setCurrentPost] = useState<PostInfo>(null);
  const [recentPost, setRecentPost] = useState<PostInfo>(null);

  return (
    <PostContext.Provider
      value={{ currentPost, setCurrentPost, recentPost, setRecentPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
