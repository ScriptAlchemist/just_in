import { DonutIcon, LayoutGrid, List, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFuzzyFilter } from "../hooks/useFuzzyFilter";
import type Post from "../interfaces/post";
import { cn } from "../lib/utils";
import { ImagePhysics } from "../pages/about-me";
import DateFormatter from "./date-formatter";
import PostPreview from "./post-preview";
import { Button } from "./ui/button";
import { PlaceholdersAndVanishInput } from "./ui/placeholdersAndVanishInput";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  const [filteredPosts, setPostsFilter, filterValue] = useFuzzyFilter(
    posts,
    ["title"],
  );
  const [showPosts, setShowPosts] = useState(true);
  const [limitShowingPosts, setLimitShowingPosts] = useState(6);
  const [isListView, setIsListView] = useState(true);

  const thePosts = filteredPosts.slice(0, limitShowingPosts);
  const placeholders = filteredPosts
    .slice(4, 25)
    .map((post) => post.title);

  // Toggle show/hide posts
  const toggleShowPosts = () => {
    if (showPosts) {
      setLimitShowingPosts(6);
      setPostsFilter("");
    }
    setShowPosts(!showPosts);
  };

  return (
    <section className="mt-12" aria-labelledby="moreStoriesHeading">
      <div className="max-w-6xl mx-auto px-4">
        {/* <h2
          id="moreStoriesHeading"
          className="text-4xl font-bold mb-6 text-start tracking-tight"
        >
          More Posts
        </h2> */}

        <div className="flex flex-col sm:flex-row justify-start mb-3">
          <h3 className="flex items-center text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Post List
          </h3>
          <div className="flex flex-row flex-wrap gap-2 justify-around items-center py-2">
            <Button
              onClick={toggleShowPosts}
              variant="outline"
              aria-expanded={showPosts}
              aria-controls="more-stories-content"
              className="ml-6 flex items-center text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
            >
              {showPosts ? (
                <Minus
                  className="h-6 w-6 text-[hsl(var(--primary))]"
                  aria-hidden="true"
                />
              ) : (
                <Plus
                  className="h-6 w-6 text-[hsl(var(--primary))]"
                  aria-hidden="true"
                />
              )}
            </Button>
            {showPosts && (
              <>
                <Button
                  onClick={() => setIsListView(false)}
                  variant="outline"
                  aria-pressed={isListView}
                  className={cn(
                    "ml-4 flex items-center text-4xl font-semibold tracking-tight",
                    !isListView &&
                      "bg-primary dark:bg-white/80 text-[hsl(var(--background))]",
                  )}
                  aria-label={
                    isListView
                      ? "Switch to tile view"
                      : "Switch to list view"
                  }
                >
                  <LayoutGrid
                    className="h-6 w-6 text-[hsl(var(--muted-primary))]"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  onClick={() => setIsListView(true)}
                  variant="outline"
                  aria-pressed={isListView}
                  className={cn(
                    "ml-4 flex items-center text-4xl font-semibold tracking-tight",
                    isListView &&
                      "bg-primary dark:bg-white/80 text-[hsl(var(--background))]",
                  )}
                  aria-label={
                    isListView
                      ? "Switch to tile view"
                      : "Switch to list view"
                  }
                >
                  <List
                    className="h-6 w-6 text-[hsl(var(--muted-primary))]"
                    aria-hidden="true"
                  />
                </Button>
              </>
            )}
          </div>
        </div>

        {showPosts ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-6 w-full mx-auto">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setPostsFilter(e.target.value)}
                value={filterValue}
                aria-label="Filter posts by title"
              />
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setPostsFilter("")}
                className="text-[hsl(var(--primary))]"
              >
                Clear Filter
              </Button>
            </div>

            {filteredPosts.length > 0 ? (
              <>
                {isListView ? (
                  <ul
                    id="more-stories-content"
                    role="list"
                    className="max-w-6xl -mx-9 sm:mx-auto space-y-4 bg-white/80 dark:bg-black/80 rounded-2xl p-2 sm:border sm:border-foreground/40"
                  >
                    {filteredPosts
                      .slice(0, limitShowingPosts)
                      .map((post) => (
                        <li
                          key={post.slug}
                          className="flex items-center w-fit group"
                        >
                          <DonutIcon className="h-8 w-8 mx-2 group-hover:text-[hsl(var(--primary))]" />
                          <Link
                            href={`/posts/${post.slug}`}
                            className="w-fit"
                          >
                            <div className="flex gap-4 items-center flex-wrap">
                              {/* <Image
                                src={post.coverImage}
                                alt={`Image for ${post.title}`}
                                className={cn("shadow-sm w-full")}
                                width={64}
                                height={64192}
                              /> */}
                              <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-wrap truncate-lines text-[hsl(var(--foreground))]">
                                  {post.title}
                                </h3>
                                <p className="text-sm line-clamp-2 text-wrap truncate text-[hsl(var(--muted-foreground))]">
                                  {post.excerpt}
                                </p>
                                <div className="hidden md:flex mt-auto">
                                  <div className="flex items-center">
                                    <img
                                      src={post.author.picture}
                                      className="w-8 h-8 rounded-full mr-2 mt-2"
                                      alt={post.author.name}
                                    />
                                    <div className="text-sm font-medium whitespace-nowrap text-[hsl(var(--foreground))]">
                                      {post.author.name}
                                      <span className=" ml-2 text-xs font-thin tracking-tighter text-[hsl(var(--muted-foreground))]">
                                        &bull;{" "}
                                        <time>
                                          <DateFormatter
                                            dateString={post.date}
                                          />
                                        </time>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div
                    id="more-stories-content"
                    role="list"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    }}
                  >
                    {(() => {
                      const columns = (() => {
                        if (typeof window === "undefined") return 4;
                        const width = window.innerWidth;
                        if (width >= 1024) return 4;
                        if (width >= 768) return 3;
                        if (width >= 640) return 2;
                        return 1;
                      })();
                      const baseCount = limitShowingPosts;
                      const remainder = baseCount % columns;
                      let displayCount = baseCount;
                      if (remainder !== 0 && remainder < columns / 2) {
                        displayCount = Math.min(
                          baseCount + (columns - remainder),
                          filteredPosts.length,
                        );
                      }
                      return filteredPosts
                        .slice(0, displayCount)
                        .map((post) => (
                          <PostPreview
                            key={post.slug}
                            title={post.title}
                            coverImage={post.coverImage}
                            date={post.date}
                            author={post.author}
                            slug={post.slug}
                            excerpt={post.excerpt}
                          />
                        ));
                    })()}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center my-10 gap-4 max-w-4xl mx-auto">
                  {limitShowingPosts < filteredPosts.length && (
                    <Button
                      onClick={() =>
                        setLimitShowingPosts((prev) =>
                          Math.min(prev + 6, filteredPosts.length),
                        )
                      }
                      variant="outline"
                      className="min-w-[140px] w-full sm:w-1/2 text-[hsl(var(--foreground))]"
                      aria-label="Show more posts"
                    >
                      Show More
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setLimitShowingPosts(6);
                      setPostsFilter("");
                    }}
                    variant="outline"
                    className="min-w-[140px] w-full sm:w-1/2 text-[hsl(var(--foreground))]"
                  >
                    Reset
                  </Button>
                </div>
              </>
            ) : (
              <div
                role="alert"
                className="flex items-center justify-center w-full min-h-[384px] text-center font-semibold text-lg sm:text-xl text-[hsl(var(--foreground))]"
              >
                No posts found with that title.
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-[300px] mb-10">
            <ImagePhysics />
          </div>
        )}
      </div>
    </section>
  );
};

export default MoreStories;
