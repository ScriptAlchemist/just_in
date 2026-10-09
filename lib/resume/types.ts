export type PaperType = "Letter" | "A4" | "Legal" | "A3" | "A5";

export interface PaperDimensions {
  name: string;
  wMm: number;
  hMm: number;
  wPx: number;
  hPx: number;
}

export interface ResumeFont {
  name: string;
  fontFamily: string;
  category: "serif" | "sans-serif" | "monospace";
  isCustom?: boolean;
}

export interface ResumeStyles {
  paper: PaperType;
  fontFamily: string;
  fontSize: number; // in px or pt, e.g. 15
  lineHeight: number; // multiplier, e.g. 1.45
  paragraphSpace: number; // in px, e.g. 8
  marginV: number; // in px, e.g. 36
  marginH: number; // in px, e.g. 40
  themeColor: string; // e.g. #000000
}

export interface HeaderItem {
  text: string;
  link?: string;
  newLine?: boolean;
}

export interface ResumeFrontmatter {
  name?: string;
  header?: HeaderItem[];
  [key: string]: unknown;
}
