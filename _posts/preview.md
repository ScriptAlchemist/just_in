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

Let's start with how you can create, and add in blog posts.


