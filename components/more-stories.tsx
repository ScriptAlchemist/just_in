import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useFuzzyFilter } from "../hooks/useFuzzyFilter";
import type Post from "../interfaces/post";
import { ImagePhysics } from "../pages/about-me";
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

        <div className="flex justify-start mb-3">
          <h3 className="flex items-center text-4xl font-semibold tracking-tight">
            Post List
          </h3>
          <Button
            onClick={toggleShowPosts}
            variant="outline"
            aria-expanded={showPosts}
            aria-controls="more-stories-content"
            className="ml-6 flex items-center text-4xl font-semibold tracking-tight"
          >
            {showPosts ? (
              <Minus className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Plus className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
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
              >
                Clear Filter
              </Button>
            </div>

            {filteredPosts.length > 0 ? (
              <>
                <div
                  id="more-stories-content"
                  role="list"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto"
                  style={{
                    // Calculate number of columns depending on screen size (1,2,3,4)
                    // Then calculate extra posts to fill last row
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(250px, 1fr))",
                  }}
                >
                  {
                    // Calculate how many posts to display so last row fills out for large screens
                    (() => {
                      const columns = (() => {
                        if (typeof window === "undefined") return 4;
                        const width = window.innerWidth;
                        if (width >= 1024) return 4;
                        if (width >= 768) return 3;
                        if (width >= 640) return 2;
                        return 1;
                      })();
                      const baseCount = limitShowingPosts;
                      // If baseCount mod columns is less than half columns, try to add extra posts to fill
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
                    })()
                  }
                </div>

                <div className="flex justify-center my-10 space-x-6 max-w-4xl mx-auto">
                  {limitShowingPosts < filteredPosts.length && (
                    <Button
                      onClick={() =>
                        setLimitShowingPosts((prev) =>
                          Math.min(prev + 6, filteredPosts.length),
                        )
                      }
                      variant="outline"
                      className="min-w-[140px]"
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
                    className="min-w-[140px]"
                  >
                    Reset
                  </Button>
                </div>
              </>
            ) : (
              <div
                role="alert"
                className="flex items-center justify-center w-full min-h-[384px] text-center font-semibold text-lg sm:text-xl"
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
