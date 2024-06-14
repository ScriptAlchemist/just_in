import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

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
    <div className='border border-indigo-500 hover:border-red-500 hover:motion-safe:animate-[pulse_5s_ease-in-out_infinite] bg-stone-800 hover:bg-stone-700 rounded-xl p-5 mb-auto h-80 md:h-96'>
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className=""
      >
      <div className="">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="mt-4 flex flex-col h-36 md:h-52 gap-y-2">
        <h3 className="text-lg mb-3 leading-snug truncate">
            {title}
        </h3>
        <div className="hidden sm:block text-sm">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-sm leading-relaxed truncate-lines">{excerpt}</p>
        <div className='hidden md:block mt-auto'><Avatar name={author.name} picture={author.picture} /></div>
      </div>
      </Link>
    </div>
  )
}

export default PostPreview
