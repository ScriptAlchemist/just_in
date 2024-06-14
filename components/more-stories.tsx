import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import { useFuzzyFilter } from '../hooks/useFuzzyFilter'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  const [filteredPosts, setPostsFilter, filterValue] = useFuzzyFilter(posts, ['title']);

  return (
    <section>
      <h2 className="text-indigo-500 w-full px-4 border border-indigo-500 rounded-xl bg-stone-800 my-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Posts
      </h2>
      <div className="relative mb-6">
        <input
          onChange={(event) => setPostsFilter(event.target.value)}
          value={filterValue}
          placeholder="Filter posts by title..."
          className="rounded-md text-2xl w-full border-indigo-500 h-10 text-indigo-500 p-4"
        />
      </div>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
          {filteredPosts.map((post) => (
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
      ) : (
        <button onClick={() => setPostsFilter('')} className='flex text-center w-full h-48 items-center justify-center font-semibold text-indigo-500 hover:text-indigo-300 text-4xl'>
          No posts with that title
        </button>
      )}
    </section>
  )
}

export default MoreStories
