import {unified} from 'unified'
//import stream from 'unified-stream'
import remarkParse from 'remark-parse'
//import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
// import remarkGfm from 'remark-gfm'

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    // .use(remarkGfm)
    //.use(remarkToc)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "Contents" })
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString()
}
