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
    <div className='border border-indigo-500 hover:border-red-500 hover:motion-safe:animate-[pulse_5s_ease-in-out_infinite] bg-stone-800 hover:bg-stone-700 rounded-xl p-5 mb-auto'>
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className=""
      >
      <div className="mx-auto justify-center max-h-fit mb-4">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
        <h3 className="text-lg mb-3 leading-snug max-h-[80px] overflow-hidden">
            {title}
        </h3>
        <div className="hidden sm:block text-sm mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-sm leading-relaxed mb-4 truncate">{excerpt}</p>
      <div className='hidden sm:block'><Avatar name={author.name} picture={author.picture} /></div>
      </Link>
    </div>
  )
}

export default PostPreview
