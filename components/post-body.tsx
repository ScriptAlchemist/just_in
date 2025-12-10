import { useEffect } from "react";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(
      "[data-rehype-pretty-code-figure]",
    );

    codeBlocks.forEach((codeBlock) => {
      // Skip if already wrapped in details
      if (codeBlock.parentElement?.tagName === "DETAILS") {
        return;
      }

      let title = codeBlock.querySelector(
        "[data-rehype-pretty-code-title]",
      );
      const pre = codeBlock.querySelector("pre");
      if (!pre) {
        return;
      }

      // Get summary text from title or language
      let summaryText = "View Code";
      if (title && title.textContent) {
        summaryText =
          title.textContent.replace("Copy", "").trim() || summaryText;
      } else {
        const code = pre.querySelector("code");
        const language = code?.getAttribute("data-language");
        if (language) {
          summaryText = `View ${language} Code`;
        }
      }

      // Create details element
      const details = document.createElement("details");
      details.className = "code-collapse";
      details.open = true;

      // Create summary element
      const summary = document.createElement("summary");
      summary.className = "code-collapse-summary";
      summary.textContent = summaryText;

      // Wrap the code block
      codeBlock.parentNode?.insertBefore(details, codeBlock);
      details.appendChild(summary);
      details.appendChild(codeBlock);

      // Now handle title and copy button
      if (!title) {
        title = document.createElement("div");
        title.setAttribute("data-rehype-pretty-code-title", "");
        pre.before(title);
      }

      // Prevent adding duplicate buttons
      if (title.querySelector(".copy-button")) {
        return;
      }

      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.textContent = "Copy";
      copyButton.addEventListener("click", () => {
        const code = pre.innerText;
        navigator.clipboard.writeText(code);
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 2000);
      });

      title.appendChild(copyButton);

      // Add flexbox styles to the title element
      (title as HTMLElement).style.display = "flex";
      (title as HTMLElement).style.alignItems = "center";
    });
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
