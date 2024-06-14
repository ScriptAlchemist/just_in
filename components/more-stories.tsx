import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import { useFuzzyFilter } from '../hooks/useFuzzyFilter'
import { Button } from './ui/button'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  const [filteredPosts, setPostsFilter, filterValue] = useFuzzyFilter(posts, ['title']);
  const [showPosts, setShowPosts] = useState(true);

  return (
    <section>
      <div className='flex justify-center'>
        <Button onClick={() => setShowPosts(!showPosts)} variant='outline' className="w-full py-10 px-4 mt-8 mb-4 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Posts
          {showPosts ? <Minus className='ml-5 mt-2 h-10 w-10'/> :  <Plus className='ml-5 mt-2 h-10 w-10'/> } 
        </Button>
      </div>
      {showPosts ? (
        <>
          <div className="flex flex-row mb-4 items-center gap-x-4 w-5/6 mx-auto">
            <input
              onChange={(event) => setPostsFilter(event.target.value)}
              value={filterValue}
              placeholder="Filter posts by title..."
              className="rounded-md text-2xl w-full border-indigo-500 h-10 text-indigo-500 p-4"
            />
            <Button onClick={() => setPostsFilter('')} variant='outline' className="">
              Clear filter
            </Button>
          </div>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
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
            <Button onClick={() => setPostsFilter('')} variant="outline" className='flex text-center w-full h-48 items-center justify-center font-semibold text-4xl'>
              No posts with that title
            </Button>
          )}
        </>
      ) : (<div className='h-60'></div>)}
    </section>
  )
}

export default MoreStories
