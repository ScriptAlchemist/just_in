const NEW_PAGE_CLASS = "md-it-newpage";
const PAGE_BREAK_CLASS = "resume-page-break";

const removeElements = (parent: HTMLElement, selector: string) => {
  const elements = Array.from(parent.querySelectorAll(selector));
  for (const el of elements) {
    el.remove();
  }
};

const getHeight = (element: Element): number => {
  if (!(element instanceof HTMLElement)) return 0;
  const style = window.getComputedStyle(element);
  const marginTop = parseFloat(style.marginTop) || 0;
  const marginBottom = parseFloat(style.marginBottom) || 0;
  const h = element.offsetHeight || element.clientHeight || 0;
  return h + marginTop + marginBottom;
};

/**
 * Keeps related resume blocks together:
 * - A job's title row (<dl>) with its bullet points (<ul> / <ol>)
 * - A section heading (<h2>) with the first job entry underneath it
 */
const getProtectedGroup = (children: Element[], index: number): Element[] => {
  const current = children[index];
  if (!current) return [];
  const group = [current];
  const next = children[index + 1];

  if (!next) return group;

  // Keep a job title row with its bullets
  if (current.tagName === "DL" && next.matches("ul, ol")) {
    group.push(next);
    return group;
  }

  // A section heading should never be the lonely last item on a page
  if (current.tagName === "H2") {
    group.push(next);

    const following = children[index + 2];
    if (next.tagName === "DL" && following && following.matches("ul, ol")) {
      group.push(following);
    }
  }

  return group;
};

/**
 * Calculates page breaks and injects spacer elements to align content with printed paper pages
 */
export const breakPages = (
  container: HTMLElement,
  pageHeightPx: number,
  topPx: number,
  bottomPx: number,
  leftPx: number,
  rightPx: number
): number => {
  removeElements(container, `.${PAGE_BREAK_CLASS}`);

  const contentH = pageHeightPx - topPx - bottomPx;
  if (contentH <= 100) return 1;

  const createPageBreakElement = (
    marginTop: number,
    pageNumber: number
  ): HTMLElement => {
    const pageBreak = document.createElement("div");
    pageBreak.className = PAGE_BREAK_CLASS;
    pageBreak.setAttribute("data-page", String(pageNumber));

    pageBreak.style.marginTop = `${Math.max(0, marginTop)}px`;
    pageBreak.style.paddingBottom = `${bottomPx}px`;
    pageBreak.style.marginLeft = `-${leftPx}px`;
    pageBreak.style.marginRight = `-${rightPx}px`;

    // Inner visual indicator for screen viewing
    const banner = document.createElement("div");
    banner.className = "resume-page-break-indicator";
    banner.innerText = `Page ${pageNumber + 1}`;
    pageBreak.appendChild(banner);

    return pageBreak;
  };

  let pageH = 0;
  let pageCount = 1;
  const newFragment = document.createDocumentFragment();
  const children = Array.from(container.children);

  for (let index = 0; index < children.length; ) {
    const group = getProtectedGroup(children, index);
    if (group.length === 0) break;

    const groupH = group.reduce((sum, child) => sum + getHeight(child), 0);
    const isManualBreak = !!(
      group[0]?.classList && group[0].classList.contains(NEW_PAGE_CLASS)
    );

    if (pageH > 0 && (pageH + groupH > contentH || isManualBreak)) {
      const remainingSpace = pageHeightPx - pageH - topPx;
      newFragment.appendChild(
        createPageBreakElement(remainingSpace, pageCount)
      );
      pageCount++;
      pageH = 0;
    }

    for (const child of group) {
      newFragment.appendChild(child.cloneNode(true));
    }

    pageH += groupH;
    index += group.length;
  }

  container.innerHTML = "";
  container.appendChild(newFragment);

  const remainingBottom = Math.max(0, pageHeightPx - pageH - topPx);
  container.style.paddingBottom = `${remainingBottom}px`;

  return pageCount;
};
