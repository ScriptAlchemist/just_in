import {
  ChevronDownIcon,
  ChevronUpIcon,
  DonutIcon,
  LayoutGrid,
  List,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFuzzyFilter } from "../hooks/useFuzzyFilter";
import type Post from "../interfaces/post";
import { cn } from "../lib/utils";
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
  const [limitShowingPosts, setLimitShowingPosts] = useState(4);
  const [isListView, setIsListView] = useState(true);
  const [hasShownMore, setHasShownMore] = useState(false);
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
      <div className="mx-[-1.25rem] max-w-none px-2 sm:mx-auto sm:max-w-6xl sm:px-4">
        <div className="mb-5 grid grid-cols-1 items-start gap-3 min-[420px]:grid-cols-[minmax(0,1fr)_auto] sm:gap-4">
          <div className="min-w-0">
            <Button
              onClick={toggleShowPosts}
              variant="unstyled"
              aria-expanded={showPosts}
              aria-controls="more-stories-content"
              className="flex h-auto max-w-full items-start px-0 py-0 text-left"
            >
              <div className="flex flex-col gap-1 text-[hsl(var(--foreground))]">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-semibold tracking-tight leading-none sm:text-4xl">
                    Post List
                  </h3>
                  {showPosts ? (
                    <ChevronDownIcon
                      className="h-5 w-5 text-[hsl(var(--primary))] sm:h-6 sm:w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronUpIcon
                      className="h-5 w-5 text-[hsl(var(--primary))] sm:h-6 sm:w-6"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="text-start text-sm font-medium leading-none text-[hsl(var(--foreground))]">
                  Showing{" "}
                  {showPosts
                    ? Math.min(limitShowingPosts, filteredPosts.length)
                    : 0}{" "}
                  of {filteredPosts.length} posts
                </div>
              </div>
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-self-start min-[420px]:justify-self-end">
            {showPosts && (
              <>
                <Button
                  onClick={() => setIsListView(false)}
                  variant="outline"
                  aria-pressed={!isListView}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl px-0",
                    !isListView &&
                      "bg-primary dark:bg-white/80 text-[hsl(var(--background))]",
                  )}
                  aria-label="Switch to tile view"
                >
                  <LayoutGrid className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  onClick={() => setIsListView(true)}
                  variant="outline"
                  aria-pressed={isListView}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl px-0",
                    isListView &&
                      "bg-primary dark:bg-white/80 text-[hsl(var(--background))]",
                  )}
                  aria-label="Switch to list view"
                >
                  <List className="h-5 w-5" aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
        </div>

        {showPosts && (
          <>
            <div className="mb-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e) => setPostsFilter(e.target.value)}
                  value={filterValue}
                  aria-label="Filter posts by title"
                />
              </div>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setPostsFilter("")}
                className="w-full rounded-xl text-[hsl(var(--primary))] sm:w-auto"
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
                    className="mx-auto max-w-6xl divide-y divide-[hsl(var(--primary))]/25 rounded-2xl border border-foreground/20 bg-[hsl(var(--code))] px-2 py-3 sm:px-4 sm:py-5"
                  >
                    {filteredPosts
                      .slice(0, limitShowingPosts)
                      .map((post) => (
                        <li
                          key={post.slug}
                          className="group py-2 first:pt-0 last:pb-0 sm:py-3"
                        >
                          <Link
                            href={`/posts/${post.slug}`}
                            className="flex w-full items-start gap-3 rounded-xl px-1.5 py-2 transition-colors hover:bg-[hsl(var(--background))]/60 sm:px-3"
                          >
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--primary))]/40 bg-[hsl(var(--background))] text-[hsl(var(--primary))]">
                              <DonutIcon className="h-4 w-4 group-hover:text-[hsl(var(--primary))]" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="truncate-lines text-base font-semibold leading-snug text-[hsl(var(--foreground))] sm:text-lg">
                                {post.title}
                              </h3>
                              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                                {post.excerpt}
                              </p>

                              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[hsl(var(--muted-foreground))] sm:text-sm">
                                <img
                                  src={post.author.picture}
                                  className="h-7 w-7 rounded-full"
                                  alt={post.author.name}
                                />
                                <span className="font-medium text-[hsl(var(--foreground))]">
                                  {post.author.name}
                                </span>
                                <span className="hidden sm:inline">
                                  &bull;
                                </span>
                                <time>
                                  <DateFormatter
                                    dateString={post.date}
                                  />
                                </time>
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
                    className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {filteredPosts
                      .slice(0, limitShowingPosts)
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
                      ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center my-10 gap-4 max-w-4xl mx-auto">
                  {limitShowingPosts < filteredPosts.length && (
                    <Button
                      onClick={() => {
                        setLimitShowingPosts((prev) =>
                          Math.min(prev + 4, filteredPosts.length),
                        );
                        setHasShownMore(true);
                      }}
                      variant="outline"
                      className="min-w-[140px] w-full sm:w-1/2 text-[hsl(var(--foreground))]"
                      aria-label="Show more posts"
                    >
                      Show More (
                      {Math.min(
                        limitShowingPosts,
                        filteredPosts.length,
                      )}
                      /{filteredPosts.length})
                    </Button>
                  )}
                  {hasShownMore && (
                    <Button
                      onClick={() => {
                        setLimitShowingPosts(4);
                        setPostsFilter("");
                        setHasShownMore(false);
                      }}
                      variant="outline"
                      className="min-w-[140px] w-full sm:w-1/2 text-[hsl(var(--foreground))]"
                    >
                      Reset
                    </Button>
                  )}
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
        )}
      </div>
    </section>
  );
};

export default MoreStories;
