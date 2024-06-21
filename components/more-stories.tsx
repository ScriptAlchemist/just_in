import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import { useFuzzyFilter } from '../hooks/useFuzzyFilter'
import { Button } from './ui/button'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { BackgroundGradient } from './ui/backgroundGradiant'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  const [filteredPosts, setPostsFilter, filterValue] = useFuzzyFilter(posts, ['title']);
  const [showPosts, setShowPosts] = useState(true);
  const [showMoreThan4, setShowMoreThan4] = useState(false);
  const thePosts = showMoreThan4 ? filteredPosts : filteredPosts.slice(0, 4);

  return (
    <section>
      <div className='flex w-full justify-end'>
        <Button onClick={() => setShowPosts(!showPosts)} variant='unstyled' className="w-full md:w-4/6 my-12">
          <BackgroundGradient containerClassName='w-full' className='bg-black px-4 rounded-3xl flex flex-row items-center text-5xl md:text-7xl font-bold tracking-tighter leading-tight'>
            More Posts
            {showPosts ? <Minus className='ml-5 mt-2 h-10 w-10'/> :  <Plus className='ml-5 mt-2 h-10 w-10'/> } 
          </BackgroundGradient>
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
            <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
              {thePosts.map((post) => (
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
            <div className='flex justify-center my-14'>
              <Button onClick={() => setShowMoreThan4(!showMoreThan4)} variant='outline' className="w-4/6">
              {showMoreThan4 ? 'Hide all posts, but 4' : 'Show all posts...' }
              </Button>
            </div>
            </>
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
