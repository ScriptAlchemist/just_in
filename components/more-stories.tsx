import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import { useFuzzyFilter } from '../hooks/useFuzzyFilter'
import { Button } from './ui/button'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { BackgroundGradient } from './ui/backgroundGradiant'
import { MovingBorderButton } from './ui/movingBorder'
import { PlaceholdersAndVanishInput } from './ui/placeholdersAndVanishInput'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  const [filteredPosts, setPostsFilter, filterValue] = useFuzzyFilter(posts, ['title']);
  const [showPosts, setShowPosts] = useState(true);
  const [limitShowingPosts, setLimitShowingPosts] = useState(4);
  const thePosts = filteredPosts.slice(0, limitShowingPosts);
  const placeholders = filteredPosts.slice(4, 25).map(post => post.title);

  return (
    <section className='mt-10'>
    {!showPosts && <div className='flex w-full justify-end'>
        <Button onClick={() => setShowPosts(!showPosts)} variant='unstyled' className="bg-blue-200 px-0 w-7/8 md:w-4/6 my-12">
          <BackgroundGradient containerClassName='w-full' className='bg-black px-4 rounded-3xl flex flex-row items-center text-2xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight'>
            More Posts
            {showPosts ? <Minus className='ml-5 mt-2 h-10 w-10'/> :  <Plus className='ml-5 mt-2 h-10 w-10'/> } 
          </BackgroundGradient>
        </Button>
      </div>}
      {showPosts ? (
        <>
          <div className='flex flex-col sm:flex-row w-full sm:w-5/6 mx-auto mb-4 gap-4 items-center justify-center'>
          <BackgroundGradient containerClassName='w-full sm:w-5/6' className="p-[1px]">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(event) => setPostsFilter(event.target.value)}
              value={filterValue}
            />
          </BackgroundGradient>
            <MovingBorderButton onClick={() => setPostsFilter('')} className="">
              Clear filter
            </MovingBorderButton>
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
            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 my-14 max-w-4xl mx-auto'>
            {limitShowingPosts < filteredPosts.length &&
              <Button onClick={() => setLimitShowingPosts((limitShowingPosts + 8 > filteredPosts.length) ? filteredPosts.length : limitShowingPosts + 8)} variant='outline' className="w-full">
                Show more
              </Button>
            }
              <Button onClick={() => {
                setShowPosts(false);
                setLimitShowingPosts(4)
              }} variant='outline' className="w-full bg-red-500/50 text-white">
                hide posts
              </Button>
            </div>
            </>
          ) : (
            <Button onClick={() => setPostsFilter('')} variant="outline" className='flex text-center w-full h-48 items-center justify-center font-semibold text-xl sm:text-4xl'>
              No posts with that title
            </Button>
          )}
        </>
      ) : (<div className='h-60'></div>)}
    </section>
  )
}

export default MoreStories
