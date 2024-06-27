import Link from "next/link";

export const MyExperience = () => {
  return (
    <div className="h-full">
      <section>
        <h2 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          <span className="underline decoration-indigo-500">
            About Me
          </span>
        </h2>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          Welcome to my personal website! I'm Justin Bender, a dedicated and passionate software developer based in the USA. With a robust background in software engineering, I have amassed experience across a spectrum of projects, from architecting full-stack applications to integrating cutting-edge technologies.
        </p>
      </section>

      <section>
        <h2 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          <span className="underline decoration-indigo-500">
            Professional Experience
          </span>
        </h2>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          Currently, I serve as a Software Engineer at Paperstac, where my responsibilities include building and maintaining multiple applications within a monorepo. I specialize in creating React components using Next.js, managing user login flows, account settings, and data visualization for our online marketplace.
        </p>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          Previously, my role at Bridge Discussion focused on product design and implementation, where I developed demos for funding presentations using a robust JavaScript stack featuring React/Next.js and integrated services like GCP and Firebase.
        </p>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          I also contributed as a Software Engineer at Cardano Goat, concentrating on developing WASM-integrated applications to seamlessly interact with the Cardano blockchain. My work prioritized enhancing user experience and incorporating open-source tools to maintain a competitive edge.
        </p>
      </section>

      <section>
        <h2 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          <span className="underline decoration-indigo-500">
            Freelance and Other Roles
          </span>
        </h2>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          In addition to my full-time positions, I have taken on roles as a Freelance Software Developer, leveraging tools such as Angular, React, Wix, and Google Firestore to build full-stack websites from initial design wireframes. My focus remains on optimizing performance and enriching user experience.
        </p>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          At Proxify, I addressed critical production challenges and optimized the Angular 5 frontend for efficient contract worker job matching. Earlier in my career at Therigy as a Junior Software Developer, I collaborated cross-functionally to develop web applications and enhance productivity through comprehensive testing suites.
        </p>
      </section>

      <section>
        <h2 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          <span className="underline decoration-indigo-500">
            Technical Skills
          </span>
        </h2>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          My technical proficiencies encompass a wide array of languages and frameworks, including JavaScript, TypeScript, Python, PHP, Go, and Rust. I am adept in front-end technologies such as React.js, Next.js, Angular, and state management with Redux. Additionally, I excel in backend development using Express.js and database management with MongoDB and SQL.
        </p>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          I am well-versed in cloud technologies like Docker, Kubernetes, AWS, Firebase, and Google Cloud, implementing CI/CD pipelines, GraphQL APIs, microservices, and serverless architectures. My toolkit also includes version control with Git, project management using JIRA, and proficiency in UI frameworks like TailwindCSS and Bootstrap.
        </p>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          Passionate about continuous learning, I explore emerging technologies and methodologies to enhance my skills and deliver innovative solutions. Outside of coding, I share insights on scripting and development through my blog at SomeScripting.com.
        </p>
      </section>

      <section>
        <h2 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          <span className="underline decoration-indigo-500">
            Contact
          </span>
        </h2>
        <p className="my-4 font-normal text-lg tracking-tighter leading-tight">
          Thank you for visiting my website. Please feel free to connect with me on <Link href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">LinkedIn</Link> or reach out via my socials.
        </p>
      </section>
    </div>
  );
};

