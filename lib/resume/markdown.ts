import MarkdownIt from "markdown-it";
import deflist from "markdown-it-deflist";
import matter from "gray-matter";
import { ResumeFrontmatter } from "./types";

const md = new MarkdownIt({
  html: true,
  breaks: false,
  linkify: true,
});

md.use(deflist);

// Configure external links to open safely in new window
const defaultRenderLink =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const hrefIndex = tokens[idx].attrIndex("href");
  if (hrefIndex >= 0) {
    const rawHref = tokens[idx].attrs?.[hrefIndex][1] ?? "";
    const hrefStr = String(rawHref);
    if (/^https?:\/\//.test(hrefStr)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
  }
  return defaultRenderLink(tokens, idx, options, env, self);
};

/**
 * Splits continuous definition lists so each dt/dd group is isolated in its own <dl> flex container
 */
const resolveDeflist = (html: string): string => {
  const dlReg = /<dl>([\s\S]*?)<\/dl>/g;
  const dlList = html.match(dlReg);

  if (!dlList) return html;

  let resolved = html;
  for (const dl of dlList) {
    const newDl = dl.replace(/<\/dd>\n<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>");
    resolved = resolved.replace(dl, newDl);
  }

  return resolved;
};

/**
 * Renders optional frontmatter metadata (e.g. name and header contact rows)
 */
const resolveHeader = (html: string, frontmatter: ResumeFrontmatter): string => {
  let headerHtml = "";

  if (frontmatter.name) {
    headerHtml += `<h1>${frontmatter.name}</h1>\n`;
  }

  if (frontmatter.header && Array.isArray(frontmatter.header)) {
    const items = frontmatter.header;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;

      if (item.newLine) {
        headerHtml += "<br>\n";
      }

      const isLastOrBeforeNewLine =
        i === items.length - 1 || !!items[i + 1]?.newLine;
      const separatorClass = isLastOrBeforeNewLine ? " no-separator" : "";

      headerHtml += `<span class="resume-header-item${separatorClass}">`;
      if (item.link) {
        headerHtml += `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
      } else {
        headerHtml += item.text;
      }
      headerHtml += `</span>\n`;
    }
  }

  if (!headerHtml) return html;

  return `<div class="resume-header">${headerHtml}</div>\n${html}`;
};

/**
 * Pre-process LaTeX-like utility commands:
 * - \newpage -> manual page break marker
 * - \\[10px] -> explicit vertical spacer
 */
const preprocessLatexCommands = (markdownText: string): string => {
  return markdownText
    .replace(/\\newpage/g, '<div class="md-it-newpage"></div>')
    .replace(/\\\\\[(\d+)px\]/g, '<div style="height: $1px;"></div>');
};

/**
 * Full markdown-to-HTML rendering pipeline for resumes
 */
export const renderResumeMarkdown = (rawMarkdown: string): string => {
  let body = rawMarkdown;
  let attributes: ResumeFrontmatter = {};

  try {
    const parsed = matter(rawMarkdown);
    body = parsed.content;
    attributes = parsed.data as ResumeFrontmatter;
  } catch (e) {
    // If frontmatter parsing fails, treat whole text as content
    console.warn("Frontmatter parse error:", e);
    body = rawMarkdown;
  }

  const preprocessed = preprocessLatexCommands(body);
  let html = md.render(preprocessed);

  html = resolveDeflist(html);
  html = resolveHeader(html, attributes);

  return html;
};
