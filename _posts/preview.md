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






