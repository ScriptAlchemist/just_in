//import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <>
    <section className="flex-col md:flex-row flex items-center md:justify-around mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        Some<span className="text-red-500">(</span>Scripting<span className="text-red-500">)</span>
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
      <section>
        <p className="pb-5">The page philosophy: always keep an open mind. My views are my own. They may be flawed. The point isn't to disagree and argue. It's to read, understand and build your own mental model.</p>
        <p className="pb-5">Let's go on an adventure!</p>
      </section>
      </>
  )
}

export default Intro
