//import { CMS_NAME } from '../lib/constants'
import Image from 'next/image';
import JustinImg from '../public/assets/blog/authors/skydiver_justin.jpeg';

const Intro = () => {
  return (
    <>
    <section className="flex-col md:flex-row flex items-center md:justify-around mt-8 md:mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        <span className="underline decoration-indigo-500">Some</span><span className="text-red-500">(</span>Scripting<span className="text-red-500">)</span><div className='text-sm tracking-wider'>By Justin Bender</div>
      </h1>
      <div className="flex gap-x-8 text-center text-lg mt-5">
        <div>
          <a
            title="Visit Justins LinkedIn"
            href="https://www.linkedin.com/in/benderjustin"
            className="hover:text-indigo-500 duration-200 transition-colors"
          >
            <span className='text-red-500'>(</span>
              LinkedIn
            <span className='text-red-500'>)</span>
          </a>
        </div>
        <div>
          <a
            title="Visit Justins Twitter"
            href="https://twitter.com/ScriptAlchemist"
            className="hover:text-indigo-500 duration-200 transition-colors"
          >
            <span className='text-red-500'>(</span>
              Twitter
            <span className='text-red-500'>)</span>
          </a>
        </div>
        <div>
          <a
            title="Visit Justins Github"
            href="https://github.com/ScriptAlchemist"
            className="hover:text-indigo-500 duration-200 transition-colors"
          >
            <span className='text-red-500'>(</span>
              Github
            <span className='text-red-500'>)</span>
          </a>
        </div>
      </div>
    </section>
      <section className="text-lg flex gap-x-4">
      <div className='hidden sm:block w-1/4 my-auto'>
        <Image
          src={JustinImg}
          style={{objectFit: "contain"}}
          alt="Picture of Justin Bender"
          placeholder="blur"
          className='rounded-2xl h-52'
        />
        </div>
        <div className='flex flex-col mt-5 w-full md:w-3/4 mx-auto'>
        <p className="pb-5 font-semibold">
          <span className="text-red-500 text-2xl">Hello</span>, my name is <span className="text-indigo-500 text-2xl">Justin</span>
        </p>
        <p className="text-sm sm:text-lg pb-5 font-thin">These opinions are my own. Not for any employer that I currently work.</p>
        <p className="text-sm sm:text-lg font-semibold">All of the posts will be listed below using a timestamp. With the most recent one at the top. If you have any questions, you can message me.</p>
      </div>
      </section>
      <h2 className="ml-0 sm:ml-20 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:pr-8 my-8 md:my-14">
        What is on my mind<span className="text-indigo-500">?</span>
      </h2>
      </>
  )
}

export default Intro
