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

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section className="border border-red-500 hover:border-indigo-500 flex flex-col lg:flex-row items-center justify-center bg-stone-800 hover:bg-stone-700 rounded-xl">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className=""
      >
      <div className="mx-4 my-4 lg:ml-20 md:gap-x-16 lg:gap-x-8 flex-grow">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
              {title}
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
      <div className=" w-full mx-auto flex-grow">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      </Link>
    </section>
  )
}

export default HeroPost
