import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const prettyCodeOptions: Options = {
  theme: "night-owl",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
    // Optional: mark each line so you can style line numbers via CSS
    node.properties.className = [
      ...(node.properties.className || []),
      "line",
    ];
  },
  onVisitHighlightedLine(node) {
    node.properties.className = [
      ...(node.properties.className || []),
      "line--highlighted",
    ];
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ["word--highlighted"];
  },
};

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
