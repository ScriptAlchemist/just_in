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

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className='flex justify-center'>
      <section className="lg:mr-32 rotate-3 flex flex-col lg:flex-row items-center justify-center rounded-xl lg:w-3/5">
        <BackgroundGradient className='text-black'>
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className=""
          >
          <div className="mx-6 my-4 md:gap-x-16 lg:gap-x-8 flex-grow">
            <div>
              <h3 className="mb-4 text-2xl lg:text-3xl leading-tight">
                  {title}
              </h3>
              <div className="mb-4 md:mb-0 text-sm">
                <DateFormatter dateString={date} />
              </div>
            </div>
            <div>
              <p className="text-sm leading-relaxed mb-4">{excerpt}</p>
              <Avatar name={author.name} picture={author.picture} />
            </div>
          </div>
          </Link>
        </BackgroundGradient>
      </section>
    </div>
  )
}

export default HeroPost
