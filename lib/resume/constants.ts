import { PaperDimensions, PaperType, ResumeFont, ResumeStyles } from "./types";

export const MM_TO_PX_96DPI = 3.7795275591;

export const PAPER_SIZES: Record<PaperType, PaperDimensions> = {
  A4: {
    name: "A4 (210 × 297 mm)",
    wMm: 210,
    hMm: 297,
    wPx: Math.round(210 * MM_TO_PX_96DPI), // 794
    hPx: Math.round(297 * MM_TO_PX_96DPI), // 1123
  },
  Letter: {
    name: "US Letter (8.5 × 11 in)",
    wMm: 215.9,
    hMm: 279.4,
    wPx: Math.round(215.9 * MM_TO_PX_96DPI), // 816
    hPx: Math.round(279.4 * MM_TO_PX_96DPI), // 1056
  },
  Legal: {
    name: "US Legal (8.5 × 14 in)",
    wMm: 215.9,
    hMm: 355.6,
    wPx: Math.round(215.9 * MM_TO_PX_96DPI),
    hPx: Math.round(355.6 * MM_TO_PX_96DPI),
  },
  A3: {
    name: "A3 (297 × 420 mm)",
    wMm: 297,
    hMm: 420,
    wPx: Math.round(297 * MM_TO_PX_96DPI),
    hPx: Math.round(420 * MM_TO_PX_96DPI),
  },
  A5: {
    name: "A5 (148 × 210 mm)",
    wMm: 148,
    hMm: 210,
    wPx: Math.round(148 * MM_TO_PX_96DPI),
    hPx: Math.round(210 * MM_TO_PX_96DPI),
  },
};

export const RESUME_FONTS: ResumeFont[] = [
  {
    name: "Verdana (Default)",
    fontFamily: "Verdana, Geneva, sans-serif",
    category: "sans-serif",
  },
  {
    name: "Arial (ATS Standard)",
    fontFamily: "Arial, -apple-system, BlinkMacSystemFont, sans-serif",
    category: "sans-serif",
  },
  {
    name: "Times New Roman",
    fontFamily: '"Times New Roman", Times, Georgia, serif',
    category: "serif",
  },
  {
    name: "Georgia",
    fontFamily: "Georgia, serif",
    category: "serif",
  },
  {
    name: "Garamond",
    fontFamily: 'Garamond, "Hoefler Text", serif',
    category: "serif",
  },
  {
    name: "CMU Sans Serif",
    fontFamily: '"CMU Sans Serif", -apple-system, BlinkMacSystemFont, sans-serif',
    category: "sans-serif",
    isCustom: true,
  },
  {
    name: "Times Newer Roman",
    fontFamily: '"Times Newer Roman", "Times New Roman", Times, serif',
    category: "serif",
    isCustom: true,
  },
  {
    name: "Adobe Garamond Pro",
    fontFamily: '"Adobe Garamond Pro", Garamond, Georgia, serif',
    category: "serif",
    isCustom: true,
  },
  {
    name: "Minion Pro",
    fontFamily: '"Minion Pro", Georgia, serif',
    category: "serif",
    isCustom: true,
  },
  {
    name: "Tex Gyre Pagella",
    fontFamily: '"Tex Gyre Pagella", Palatino, Georgia, serif',
    category: "serif",
    isCustom: true,
  },
  {
    name: "Euclid",
    fontFamily: '"Euclid", -apple-system, BlinkMacSystemFont, sans-serif',
    category: "sans-serif",
    isCustom: true,
  },
  {
    name: "Courier New",
    fontFamily: '"Courier New", Courier, monospace',
    category: "monospace",
  },
];

export const DEFAULT_STYLES: ResumeStyles = {
  paper: "A4",
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: 13,
  lineHeight: 1.3,
  paragraphSpace: 5,
  marginV: 50,
  marginH: 50,
  themeColor: "#000000",
};

export const GENERIC_RESUME_MARKDOWN = `---
---

# Bruce Wayne

<span class="iconify" data-icon="charm:person"></span> [example.com](https://example.com/)
  : <span class="iconify" data-icon="tabler:brand-github"></span> [github.com/example](https://github.com/example)
  : <span class="iconify" data-icon="tabler:phone"></span> [(+1) 123-456-7890](https://wa.me/11234567890)

<span class="iconify" data-icon="ic:outline-location-on"></span> 1234 Abc Street, Gotham, NY 10001
  : <span class="iconify" data-icon="tabler:brand-linkedin"></span> [linkedin.com/in/example](https://linkedin.com/in/example/)
  : <span class="iconify" data-icon="tabler:mail"></span> [email@example.com](mailto:email@example.com)

## Experience

**Senior Software Engineer**
  : **Wayne Enterprises**
  : **Jul 2021 - Present**

- Devised and implemented scalable cloud architecture processing over 10M daily events with 99.99% uptime
- Led the migration from monolithic architecture to containerized microservices using Docker and Kubernetes
- Mentored junior engineers and instituted code review standards across a team of 12 developers

**Software Engineer**
  : **Gotham Tech Labs**
  : **Aug 2019 - Jun 2021**

- Developed high-performance RESTful and GraphQL APIs using Node.js, TypeScript, and PostgreSQL
- Optimized database queries and caching layers with Redis, reducing API response times by 40%
- Automated CI/CD deployment pipelines using GitHub Actions, reducing release cycle time by 65%

**Software Engineering Intern**
  : **Wayne Tech**
  : **May 2018 - Aug 2018**

- Built responsive web interfaces with React and Tailwind CSS matching Figma design specifications
- Developed comprehensive automated unit and integration tests using Jest and Playwright

## Education

**B.S. in Computer Science**
  : **Gotham University**
  : **2015 - 2019**

## Skills

**Languages:** JavaScript, TypeScript, Python, Go, SQL, HTML/CSS
**Technologies & Frameworks:** React, Next.js, Node.js, Express, Tailwind CSS, PostgreSQL, Redis
**Cloud & Tools:** AWS, Docker, Kubernetes, Git, GitHub Actions, Linux
`;

export const JUSTIN_RESUME_MARKDOWN = `---
---

# Justin Bender

<span class="iconify" data-icon="charm:person"></span> [SomeScripting.com](https://www.somescripting.com/)
: <span class="iconify" data-icon="tabler:brand-github"></span> [github.com/ScriptAlchemist](https://github.com/ScriptAlchemist)
: <span class="iconify" data-icon="tabler:mail"></span> [JrkBender@gmail.com](mailto:JrkBender@gmail.com)

<span class="iconify" data-icon="ic:outline-location-on"></span> USA
: <span class="iconify" data-icon="tabler:brand-linkedin"></span> [linkedin.com/in/benderjustin](https://linkedin.com/in/benderjustin)

## Experience

**Prompt Engineer**
: **Paperstac**
: **Apr 2025 - Present**

- Build out prompts (Agentic Development), that do work that I review.
- Fixing all of it's mistakes...

**Software Engineer**
: **Paperstac**
: **Sep 2023 - Present**

- Building with Turborepo, sharing UI Storybook design libraries to scale 3+ applications at once
- Developing React components for Next.js, ensuring reusable design across multiple apps
- Maintaining legacy applications, fixing bugs, and integrating AI-driven features

**Software Engineer**
: **Bridge Discussion/Job Searching**
: **Mar 2023 - Sep 2023**

- Developed using a JavaScript stack (React/Next.js) with GCP/Firebase
- Designed and implemented product features for Bridge Discussion
- Built functional demos for funding presentations

**Software Engineer**
: **Cardano Goat**
: **Nov 2021 - Jan 2023**

- Developed WASM-integrated applications for seamless interaction with Cardano blockchain
- Worked with React, Next.js, TypeScript, TailwindCSS, Rust, WebAssembly, IPFS, and Cardano wallet extensions
- Integrated cutting-edge open-source tools to maintain a competitive edge
- Designed customer-focused products from 3D-rendered NFTs to full web applications

**Software Developer**
: **Freelance Contracts**
: **Feb 2020 - Nov 2021**

- Adapted to client requirements using Angular, React, Wix, GoDaddy, Google Firestore
- Built full-stack websites from design wireframes, offering up to 3 revisions
- Optimized website performance, reducing load times from 12s to 1-3s (90% faster) following Google's recommendations

**Angular Developer**
: **Proxify**
: **Oct 2019 - Jan 2020**

- Fixed a critical production login issue, restoring full application functionality
- Developed and maintained Angular 5 frontend for a contractor job-finding platform

**Junior Software Developer**
: **Therigy**
: **Feb 2018 - Apr 2019**

- Built user-centric web applications using AngularJS 1.6 and PHP
- Maintained and upgraded three legacy software systems for specialty pharmacy prescription and appointment management
- Developed testing suites for Quality Assurance, boosting efficiency by 60%

**Frontend Developer**
: **Sky Pirates**
: **Jan 2018 - Mar 2018**

- Developed and optimized an Angular 6+ frontend, achieving an 85% Google Lighthouse performance score
- Fostered an inclusive work environment training new skydivers

## Skills

**Programming Languages:** <span class="iconify" data-icon="vscode-icons:file-type-js-official"></span> JavaScript, <span class="iconify" data-icon="vscode-icons:file-type-typescript-official"></span> TypeScript, <span class="iconify" data-icon="vscode-icons:file-type-rust"></span> Rust, <span class="iconify" data-icon="vscode-icons:file-type-go"></span> Golang, <span class="iconify" data-icon="vscode-icons:file-type-python"></span> Python, <span class="iconify" data-icon="vscode-icons:file-type-php"></span> PHP

**Frontend Technologies:** <span class="iconify" data-icon="vscode-icons:file-type-html"></span> HTML5, <span class="iconify" data-icon="vscode-icons:file-type-css"></span> CSS3, <span class="iconify" data-icon="vscode-icons:file-type-reactjs"></span> React.js, <span class="iconify" data-icon="vscode-icons:file-type-next"></span> Next.js, <span class="iconify" data-icon="vscode-icons:file-type-tailwind"></span> TailwindCSS, Bootstrap, Redux

**Backend & Databases:** <span class="iconify" data-icon="vscode-icons:file-type-node"></span> Node.js, Express.js, MongoDB, SQL, NoSQL, GraphQL, RESTful APIs

**Cloud & DevOps:** AWS, Google Cloud, Firebase, CI/CD, Docker, Kubernetes, Serverless, UNIX, Linux

**Other:** Microservices, Distributed Systems, OpenAI Prompting, PWA, WebAssembly (WASM), Unreal Engine

## Projects

**Some Scripting**
: **Software Developer**
: **2023**

Personal blog utilizing Markdown-based notes generation
GitHub Repository: https://github.com/ScriptAlchemist/just_in
Website: https://www.somescripting.com
`;

export const DEFAULT_RESUME_MARKDOWN = GENERIC_RESUME_MARKDOWN;

export const DEFAULT_RESUME_CSS = `/* Generic ATS Resume Styling from Markdown Resume */

#resume-content {
  background-color: white;
  color: black;
  text-align: left;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

#resume-content p,
#resume-content li,
#resume-content dl {
  margin: 0;
}

/* Headings */

#resume-content h1,
#resume-content h2,
#resume-content h3 {
  font-weight: bold;
}

#resume-content h1 {
  font-size: 2.5em;
  letter-spacing: 0.1em;
  text-align: center;
  margin-bottom: 0.25em;
}

#resume-content h2,
#resume-content h3 {
  margin-bottom: 0.25em;
  margin-top: 1.0em;
  font-size: 1.2em;
}

#resume-content h1,
#resume-content h2 {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #333333;
}

/* Lists */

#resume-content ul,
#resume-content ol {
  padding-left: 1.5em;
  margin: 0.2em 0 1.0em 0;
}

#resume-content ul {
  list-style-type: disc;
}

#resume-content ol {
  list-style-type: decimal;
}

/* Definition Lists */

#resume-content dl {
  display: flex;
  margin-top: 0.35em;
}

#resume-content dl dt,
#resume-content dl dd:not(:last-child) {
  flex: 1;
}

#resume-content dl dd:last-child {
  text-align: right;
}

/* SVG & Images */

#resume-content svg.iconify,
#resume-content .iconify {
  vertical-align: -0.2em;
  display: inline-block;
  width: 1em;
  height: 1em;
}

#resume-content img {
  max-width: 100%;
}

/* Header */

#resume-content .resume-header {
  text-align: center;
}

#resume-content .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}

#resume-content .resume-header-item:not(.no-separator)::after {
  content: " | ";
}

/* Links */
#resume-content a {
  color: inherit;
  text-decoration: none;
}

#resume-content a:hover {
  text-decoration: underline;
}
`;
