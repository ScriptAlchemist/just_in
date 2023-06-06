---
title: 'Making a Blog with Next.JS and Markdown'
excerpt: "Today is the day that we start working on the blog. After
looking around for the right tools. I have settled, now it's time to
write. I'll teach you how to make your own for day one."
coverImage: '/just_in/assets/blog/first_post/cover.jpg'
date: '2023-06-06T01:31:19.993Z'
author:
  name: Justin Bender
  picture: '/just_in/assets/blog/authors/bender.png'
ogImage:
  url: '/just_in/assets/blog/first_post/cover.jpg'
---

## Setting up the blog

Let's go over how you can also setup a similar blog like this. It is
still very simple and there needs to be lots more styling. That's fine
for now. The main idea is getting the ideas out.

The philosophy we should have is, always keep an open mind. My views are
my own and they can be flawed. The point isn't to disagree and argue.
It's to read, understand and build your own mental model.

### Prerequisites

* Make sure you have [Node.js](https://nodejs.org/en) installed.
* Make sure you know about [Markdown Guide - Learn and Use Markdown](https://www.markdownguide.org/)
* Make sure you know about
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript),
[Next.js](https://nextjs.org/docs), and
[React](https://reactjs.org/docs/getting-started.html).

If you don't know those prerequisites. This might be a bit above you
level. Come back after a little bit of reading. This project setup took
a bit longer than expected. I'll try to cover everything here.

I started with the Next.js blog template, but quickly realized that I
needed to make updates.

```bash
npx create-next-app@latest --example blog-starter your_app_name
```

This will give the basic setup ready for you. But understand, it's just
a template. It's missing pieces and is using some outdated flows.

Let's start with how you can create, and add in blog posts. We can start
at the file structure you should see.

```bash
 @types/
   remark-html.d.ts
 _posts/
   preview.md
 components/
   alert.tsx
   avatar.tsx
   container.tsx
   cover-image.tsx
   date-formatter.tsx
   footer.tsx
   header.tsx
   hero-post.tsx
   intro.tsx
   layout.tsx
   markdown-styles.module.
   meta.tsx
   more-stories.tsx
   post-body.tsx
   post-header.tsx
   post-preview.tsx
   post-title.tsx
   section-separator.tsx
 interfaces/
   author.ts
   post.ts
 lib/
   api.ts
   constants.ts
   markdownToHtml.ts
 node_modules/
 out/
 pages/
   posts/
   _app.tsx
   _document.tsx
   index.tsx
 public/
   assets/blog/
 ~   authors/
       bender.png
 ~   first_post/
       cover.jpg
   favicon/
     android-chrome-192x19
     android-chrome-512x51
     apple-touch-icon.png
     browserconfig.xml
     favicon-16x16.png
     favicon-32x32.png
     favicon.ico
     mstile-150x150.png
     safari-pinned-tab.svg
     site.webmanifest
 styles/
   index.css
 LICENSE
 next-env.d.ts
 next.config.js
 package-lock.json
 package.json
 postcss.config.js
 README.md
 tailwind.config.js
 tsconfig.json
```

There is too much in this folder to go over it all. It's past the scope
of this post. What I want us to focus on is the assets in the public
folder. We will also checkout some css, auto generation scripts and the
`_posts` folder.

First let's start with an auto generation script using Rust. We want to
automatically create new posts in some sort of order. If we look into
the code. We find that the `_posts` folder is flat. You aren't supposed
to make folder. You want the folder structure to be flat and ordered by
date.

* Create and isosec based name.
* Use that same isosec to generation the required date format.
* Create the new file with template post format.

```rust
use std::fs::File;
use std::io::Write;
use std::process::Command;
use chrono::{Utc, Datelike, Timelike};

fn main() -> Result<(), std::io::Error> {
    let now = Utc::now();
    let filename = format!("{}{}{}{}{}{}.md",
        now.year(),
        format!("{:02}", now.month()),
        format!("{:02}", now.day()),
        format!("{:02}", now.hour()),
        format!("{:02}", now.minute()),
        format!("{:02}", now.second()));

    let mut file = File::create(filename.clone())?;
    let formatted_now = now.to_rfc3339_opts(chrono::SecondsFormat::Millis, true);

    let content = format!(r#"---
title: ''
excerpt: ''
coverImage: '/assets/blog/'
date: '{}'
author:
  name: Justin Bender
  picture: '/assets/blog/authors/Bender.png'
ogImage:
  url: '/assets/blog/'
---

## Title

    "#, formatted_now);

    file.write_all(content.as_bytes())?;

    // Open Vim
    let mut child = Command::new("vim.bat")
        .arg(&filename)
        .spawn()
        .expect("Failed to open file in Vim");

    let _ = child.wait();
    Ok(())
}

```

I won't explain how to use `cargo` or `rust` in this post.

This current script only works with `vim.bat` but you could easily
change it around to `vim.exe` or `nvim.exe`. Whatever editor you like to
use.

I want to point out the template a little deeper.

```text
---
title: ''
excerpt: ''
coverImage: '/assets/blog/'
date: '{}'
author:
  name: Justin Bender
  picture: '/assets/blog/authors/Bender.png'
ogImage:
  url: '/assets/blog/'
---
## Title

```

* Starts and ends with `---` for page data.
* Fill in a title.
* Fill in the excerpt for the theme of post/hook.
* Path to the image assets. Using the `/assets/` or `/images/` style for
  direction.
* Date in a very specific format. Which you can see in the other 3
  examples. I've since deleted, but trust me. We will look at it later.
* Author data, name, and directions to image.
* The ogImage url directions to the image.

That's is going to be what is require. To make the blog functionality
work.

* Keep the `_posts` folder flat.
* Use the top template for each `.md` file.
* Write markdown below and the webpage will just work.

## Problems start to come up

* How do we search?
* Are there styles?
* Are there code block highlights?

This isn't a finished package. This is a minimal blog that needs to be
build up on. Yes it's Next.js, but it's a basic version with tailwind
baked in. Use CSS or use tailwind. As you'll see later on.

Some of these problems we will have to come back to in the future. How
do we index, how do we search? All problems we can come up with for a
later post. Right now, we just want to have a basic working blog. With 1
post about making the blog.

### How can we get the code highlighting setup?

We want to start in the `/lib/markdownToHtml.ts` and completely remove
what we have going on there right now and replace it with.

```javascript
import {unified} from 'unified'
//import stream from 'unified-stream'
import remarkParse from 'remark-parse'
//import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    //.use(remarkToc)
    .use(remarkRehype)
    .use(rehypeDocument, {title: 'Contents'})
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString()
}
```

This is going to be the setup to take our markdown and label everything
inside of the code blocks.

We start with [remark](https://github.com/remarkjs/remark) and we will
also need the css from [highlight.js](https://highlightjs.org/) for the
highlight coloring. For right now we can just take the css directly into
the styles folder.


```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #2e2a24;
  color: white;
}

.hljs{
    padding:.5em;
    @apply bg-gray-900 block overflow-x-auto;
}
.hljs,.hljs-subst{
    @apply text-white;
}
.hljs-comment{
    @apply text-gray-300;
}
.hljs-keyword,.hljs-attribute,.hljs-selector-tag,.hljs-meta-keyword,.hljs-doctag,.hljs-name{
    font-weight:bold
}
.hljs-type,.hljs-string,.hljs-number,.hljs-selector-id,.hljs-selector-class,.hljs-quote,.hljs-template-tag,.hljs-deletion{
    @apply text-red-300;

}
.hljs-title,.hljs-section{
    @apply text-indigo-300;
    font-weight:bold
}
.hljs-regexp,.hljs-symbol,.hljs-variable,.hljs-template-variable,.hljs-link,.hljs-selector-attr,.hljs-selector-pseudo{
    @apply text-sky-300;
}
.hljs-literal{
    color:#78A960
}
.hljs-built_in,.hljs-bullet,.hljs-code,.hljs-addition{
    @apply text-blue-300;
}
.hljs-meta{
    color:#1f7199
}
.hljs-meta-string{
    color:#4d99bf
}
.hljs-emphasis{
    font-style:italic
}
.hljs-strong{
    font-weight:bold
}

```

It seems that remark is a bit older and the new tool to use is. [rehype
highlight](https://github.com/rehypejs/rehype-highlight#unifieduserehypehighlight-options)
which directly connects to remark. Which are shown in the example above
the css. As this point we have a cleaned up application with the very
minimum styling.

At this point you should have a working blog. With an idea of how to add
more blog posts. There is not much to using this tool. If you have any
questions about it. Feel free to reach out.

We can even get it setup in github pages with a `workflow`. Which I'll
share. So you get get your own blogs up and running.
`.\.github\workflows\nextjs.yml`

```yaml
# Sample workflow for building and deploying a Next.js site to GitHub Pages
#
# To get started with Next.js see: https://nextjs.org/docs/getting-started
#
name: Deploy Next.js site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "16"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - name: Install dependencies
        run: npm ci
      - name: Build with Next.js
        run: npm run build
      - name: Static HTML export with Next.js
        run: npm run export
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./out

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

I'm going to finish with this post. I'm tired. 🧙 I have a working blog. I explained how you can too. I plan to go deeper into more things Rust, JavaScript and more. So I hope you enjoy as I learn to communicate better by failing.
