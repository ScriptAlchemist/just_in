import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFuzzyFilter } from "../hooks/useFuzzyFilter";
import type Post from "../interfaces/post";
import DateFormatter from "./date-formatter";
import PostPreview from "./post-preview";

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
  const [hasShownMore, setHasShownMore] = useState(false);

  const toggleShowPosts = () => {
    if (showPosts) {
      setLimitShowingPosts(6);
      setPostsFilter("");
    }
    setShowPosts(!showPosts);
  };

  return (
    <section className="journal-archive" aria-labelledby="journalArchiveHeading">
      <div className="archive-heading-row">
        <button
          type="button"
          onClick={toggleShowPosts}
          aria-expanded={showPosts}
          aria-controls="journal-archive-content"
          className="archive-title-button"
        >
          <span>
            <span className="eyebrow">Browse the archive</span>
            <span id="journalArchiveHeading">More from the journal</span>
          </span>
          {showPosts ? (
            <ChevronDown aria-hidden="true" />
          ) : (
            <ChevronUp aria-hidden="true" />
          )}
        </button>
        <p>
          Showing {showPosts ? Math.min(limitShowingPosts, filteredPosts.length) : 0}
          {" "}of {filteredPosts.length}
        </p>
      </div>

      {showPosts ? (
        <div id="journal-archive-content">
          <div className="archive-toolbar">
            <label className="archive-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Filter articles by title</span>
              <input
                type="search"
                value={filterValue}
                onChange={(event) => setPostsFilter(event.target.value)}
                placeholder="Search articles"
              />
              {filterValue ? (
                <button type="button" onClick={() => setPostsFilter("")}>
                  Clear
                </button>
              ) : null}
            </label>
            <div className="archive-view-toggle" aria-label="Article view">
              <button
                type="button"
                onClick={() => setIsListView(true)}
                aria-pressed={isListView}
                aria-label="Switch to list view"
              >
                <List aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsListView(false)}
                aria-pressed={!isListView}
                aria-label="Switch to grid view"
              >
                <LayoutGrid aria-hidden="true" />
              </button>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <>
              {isListView ? (
                <ol className="archive-list">
                  {filteredPosts.slice(0, limitShowingPosts).map((post, index) => (
                    <li key={post.slug}>
                      <Link href={`/posts/${post.slug}`}>
                        <span className="archive-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="archive-list-copy">
                          <span className="post-meta">
                            <DateFormatter dateString={post.date} />
                            <span aria-hidden="true">/</span>
                            <span>{post.author.name}</span>
                          </span>
                          <strong>{post.title}</strong>
                          <span className="archive-excerpt">{post.excerpt}</span>
                        </span>
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="journal-grid" role="list">
                  {filteredPosts.slice(0, limitShowingPosts).map((post) => (
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

              <div className="archive-pagination">
                {limitShowingPosts < filteredPosts.length ? (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => {
                      setLimitShowingPosts((current) =>
                        Math.min(current + 6, filteredPosts.length),
                      );
                      setHasShownMore(true);
                    }}
                  >
                    Show more ({Math.min(limitShowingPosts, filteredPosts.length)}/
                    {filteredPosts.length})
                  </button>
                ) : null}
                {hasShownMore ? (
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      setLimitShowingPosts(6);
                      setPostsFilter("");
                      setHasShownMore(false);
                    }}
                  >
                    Reset archive
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <div role="status" className="archive-empty">
              <Search aria-hidden="true" />
              <strong>No matching articles</strong>
              <p>Try a broader title or clear the search.</p>
              <button type="button" onClick={() => setPostsFilter("")}>
                Clear search
              </button>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default MoreStories;
