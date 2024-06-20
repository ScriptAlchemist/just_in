import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import { BackgroundGradient } from './ui/backgroundGradiant'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className=""
      >
      <BackgroundGradient className='border border-indigo-500 transition-transform duration-300 ease-in-out transform bg-stone-800 rounded-3xl p-5 mb-auto '>
      <div className="">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <h3 className="text-lg mb-3 leading-snug h-20 truncate-lines">
            {title}
        </h3>
        <div className="hidden sm:block text-sm">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-sm leading-relaxed truncate-lines">{excerpt}</p>
        <div className='hidden md:block mt-auto'><Avatar name={author.name} picture={author.picture} /></div>
      </div>
    </BackgroundGradient>
    </Link>
  )
}

export default PostPreview
