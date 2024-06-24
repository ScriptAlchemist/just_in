//import { CMS_NAME } from '../lib/constants'
import Image from 'next/image';
import JustinImg from '../public/assets/blog/authors/skydiver_justin.jpeg';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { BackgroundGradient } from './ui/backgroundGradiant';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from './ui/3dCard';
import { motion, useTime, useTransform } from "framer-motion";


const Intro = () => {
  const [text] = useTypewriter({
    words: ['What did I write about', 'What is interesting today', 'What is on my mind'],
    deleteSpeed: 80,
    loop: 1,
    onLoopDone: () => console.log(`loop completed after 3 runs.`)
  })

  return (
    <>
    <section className="flex-col md:flex-row flex items-center md:justify-around mt-8">
      <h1 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        <span className="underline decoration-indigo-500">
          Some
        </span>
        <span className="text-red-500">
          (
        </span>
        <span className="underline decoration-indigo-500">
        Scripting
        </span>
        <span className="text-red-500">
          )
        </span>
        <div className='text-sm tracking-wider'>By Justin Bender</div>
      </h1>
      <div className="flex flex-wrap gap-6 text-center text-lg mt-5 md:mt-0">
          <Link
            title="Visit Justins LinkedIn"
            href="https://www.linkedin.com/in/benderjustin"
            className="duration-200 transition-colors"
          >
            <BackgroundGradient className='px-3 bg-black text-white rounded-3xl'>
              LinkedIn
            </BackgroundGradient>
          </Link>
          <Link
            title="Visit Justins Twitter"
            href="https://twitter.com/ScriptAlchemist"
            className="duration-200 transition-colors"
          >
            <BackgroundGradient className='px-3 bg-black text-white rounded-3xl'>
              Twitter
            </BackgroundGradient>
          </Link>
          <Link
            title="Visit Justins Github"
            href="https://github.com/ScriptAlchemist"
            className="duration-200 transition-colors"
          >
            <BackgroundGradient className='px-3 bg-black text-white rounded-3xl'>
              Github
            </BackgroundGradient>
          </Link>
      </div>
    </section>
      <CardContainer className="my-10">
        <CardBody className="relative group/card hover:shadow-2xl w-full h-auto">
          <CardItem translateZ="100" className="flex flex-row py-4">
            <Image
              src={JustinImg}
              style={{objectFit: "contain"}}
              alt="Picture of Justin Bender"
              placeholder="blur"
              className='rounded-2xl hidden md:block h-52 w-fit lg:ml-20'
            />
            <div className='flex flex-col mt-5 w-5/6 md:w-3/4 mx-auto'>
              <p className="pb-5 font-semibold">
                <span className="text-red-500 text-2xl">Hello</span>, my name is <span className="text-indigo-500 text-2xl">Justin</span>
              </p>
              <p className="text-sm sm:text-lg pb-5 font-thin">These opinions are my own. Not for any employer that I currently work.</p>
              <p className="text-sm sm:text-lg font-semibold">All of the posts will be listed below using a timestamp. With the most recent one at the top. If you have any questions, you can message me.</p>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
      <h2 className="ml-0 sm:ml-20 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:pr-8 mb-8 md:mb-14">
        <span>{text}</span><span className="text-indigo-500">?</span>
      </h2>
      </>
  )
}

export default Intro
