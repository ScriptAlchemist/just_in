//import { CMS_NAME } from '../lib/constants'
import Image from 'next/image';
import JustinImg from '../public/assets/blog/authors/blackandwhite.jpg';

const Intro = () => {
  return (
    <>
    <section className="flex-col md:flex-row flex items-center md:justify-around mt-8 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        <span className="underline decoration-indigo-500">Some</span><span className="text-red-500">(</span>Scripting<span className="text-red-500">)</span><span className='text-sm tracking-wider'>By Justin Bender</span>
      </h1>
      <div className="flex flex-col space-y-4 text-center md:text-left text-lg mt-5 md:pl-8">
        <div>
          LinkedIn :{' '}
          <a
            title="Visit Justins LinkedIn"
            href="https://www.linkedin.com/in/benderjustin"
            className="underline hover:text-blue-600 duration-200 transition-colors"
          >
            Justin Bender
          </a>
        </div>
        <div>
          Twitter :{' '}
          <a
            title="Visit Justins Twitter"
            href="https://twitter.com/ScriptAlchemist"
            className="underline hover:text-blue-600 duration-200 transition-colors"
          >
            @ScriptAlchemist
          </a>
        </div>
        <div>
          Github :{' '}
          <a
            title="Visit Justins Github"
            href="https://github.com/ScriptAlchemist"
            className="underline hover:text-blue-600 duration-200 transition-colors"
          >
            ScriptAlchemist
          </a>
        </div>
      </div>
    </section>
      <section className="text-lg flex flex-col md:flex-row">
      <div className='w-full md:w-1/4'>
        <Image
          src={JustinImg}
          style={{objectFit: "contain"}}
          alt="Picture of Justin Bender"
          placeholder="blur"
          className='rounded-2xl md:mx-10'
        />
        </div>
        <div className='flex flex-col w-full mt-5 md:w-3/5 mx-auto'>
        <p className="pb-5">
          Understanding and growing ideas is how we progress as humans. In my time on this Earth I hope to share some of my experinces.
          In the hopes that someone else in this world can learn. I'm into technology, physics, mathematics and everything about life.
          I'm an expert at very few topics, but mediocre at many. I love to learn.</p>
        <p className="pb-5">These opinions are my own. They may be flawed. The point isn't to disagree and argue. It's to read, understand and build your own mental model.</p>
        <p className="pb-5 underline decoration-indigo-500">All of the articles will be listed below. With the most recent one at the top. Please enjoy, if you need me reach out on social media.</p>
      </div>
      </section>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold md:pr-8 m-5 pb-5">
        Blog Posts<span className="text-red-500">(</span>V<span className="text-red-500">)</span>
      </h2>
      </>
  )
}

export default Intro
