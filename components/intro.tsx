//import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <>
    <section className="flex-col md:flex-row flex items-center md:justify-around mt-8 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        <span className="underline decoration-indigo-500">Some</span><span className="text-red-500">(</span>Scripting<span className="text-red-500">)</span>
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
      <section className="text-lg">
        <p className="pb-5">I'd like to introduce myself. I go by Justin, and this is my Some(Scripting) page. Before technology took over. There was an obsession around aerodynamics. Crazy enough, my bother is on the path to be an AeroSpace Engineer with a Doctorate. Congrats! While I have only jumped from airplanes 5000+ times for fun/work. No military training involved. Just pure self interest, but I highly recommend it. Now we have moved into a different phase of life. Where technology takes up a larger part. Enough that I would like to start sharing experiences. That others can read and take advantage of.</p>
        <p className="pb-5 underline decoration-wavy decoration-blue-500">What this page is for. Just to share longer form information from, my own simple, minimalistic website design. It's not about the website. The information is where the focus is. Where it should be.</p>
        <p className="pb-5">These opinions are my own. They may be flawed. The point isn't to disagree and argue. It's to read, understand and build your own mental model.</p>
        <p className="pb-5 underline decoration-wavy decoration-indigo-500">All of the articles will be listed below. With the most recent one at the top. Please enjoy, reach out on the socials. I hope you can learn something useful.</p>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold md:pr-8 m-5 pb-5">
        Articles<span className="text-red-500">(</span>V<span className="text-red-500">)</span>
      </h2>
      </section>
      </>
  )
}

export default Intro
