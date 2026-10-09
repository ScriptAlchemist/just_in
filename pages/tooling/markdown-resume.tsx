import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileCode,
  FileText,
  HelpCircle,
  Maximize2,
  Printer,
  RefreshCw,
  RotateCcw,
  Sliders,
  Upload,
  ZoomIn,
  ZoomOut,
  X,
  Sparkles,
} from "lucide-react";
import PageMeta from "../../components/page-meta";
import {
  DEFAULT_RESUME_CSS,
  DEFAULT_STYLES,
  GENERIC_RESUME_MARKDOWN,
  JUSTIN_RESUME_MARKDOWN,
  PAPER_SIZES,
  RESUME_FONTS,
} from "../../lib/resume/constants";
import { renderResumeMarkdown } from "../../lib/resume/markdown";
import { breakPages } from "../../lib/resume/page-breaker";
import { PaperType, ResumeStyles } from "../../lib/resume/types";

type ViewMode = "split" | "editor" | "preview";
type EditorTab = "markdown" | "css";

const STORAGE_KEYS = {
  MARKDOWN: "somers_resume_markdown_v2",
  CSS: "somers_resume_css_v2",
  STYLES: "somers_resume_styles_v2",
};

export default function MarkdownResumeTool() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [markdown, setMarkdown] = useState<string>(GENERIC_RESUME_MARKDOWN);
  const [customCss, setCustomCss] = useState<string>(DEFAULT_RESUME_CSS);
  const [styles, setStyles] = useState<ResumeStyles>(DEFAULT_STYLES);

  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [editorTab, setEditorTab] = useState<EditorTab>("markdown");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0.85);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<string>("Saved locally");
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mount detection & load from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const savedMd = localStorage.getItem(STORAGE_KEYS.MARKDOWN);
      if (savedMd !== null) setMarkdown(savedMd);

      const savedCss = localStorage.getItem(STORAGE_KEYS.CSS);
      if (savedCss !== null) setCustomCss(savedCss);

      const savedStyles = localStorage.getItem(STORAGE_KEYS.STYLES);
      if (savedStyles) {
        setStyles((prev) => ({ ...prev, ...JSON.parse(savedStyles) }));
      }
    } catch (e) {
      console.warn("Error reading from localStorage:", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.MARKDOWN, markdown);
        localStorage.setItem(STORAGE_KEYS.CSS, customCss);
        localStorage.setItem(STORAGE_KEYS.STYLES, JSON.stringify(styles));
        setSaveStatus("Saved locally");
      } catch (e) {
        console.warn("Error saving to localStorage:", e);
      }
    }, 400);

    setSaveStatus("Saving...");
    return () => clearTimeout(timer);
  }, [mounted, markdown, customCss, styles]);

  // Render markdown to HTML string
  const renderedHtml = useMemo(() => {
    return renderResumeMarkdown(markdown);
  }, [markdown]);

  // Compute automatic fit zoom based on container width
  const fitToWidth = useCallback(() => {
    if (!previewViewportRef.current) return;
    const viewportWidth = previewViewportRef.current.clientWidth - 48; // padding
    const paper = PAPER_SIZES[styles.paper] || PAPER_SIZES.A4;
    const calculatedScale = Math.min(1, Math.max(0.4, (viewportWidth / paper.wPx) * 0.95));
    setZoom(Math.round(calculatedScale * 100) / 100);
  }, [styles.paper]);

  // Auto-fit zoom on mount and window resize
  useEffect(() => {
    if (!mounted) return;
    fitToWidth();
    const handleResize = () => fitToWidth();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, fitToWidth]);

  // DOM update & pagination calculation
  useEffect(() => {
    if (!mounted || !resumeContainerRef.current) return;
    const container = resumeContainerRef.current;

    // Imperatively update the HTML content to avoid React 19 reconciliation conflicts
    container.innerHTML = renderedHtml;

    const paper = PAPER_SIZES[styles.paper] || PAPER_SIZES.A4;
    try {
      const count = breakPages(
        container,
        paper.hPx,
        styles.marginV,
        styles.marginV,
        styles.marginH,
        styles.marginH
      );
      setTotalPages(count);
    } catch (err) {
      console.error("Pagination calculation error:", err);
    }

    // Refresh iconify SVGs if the library is loaded
    if (typeof window !== "undefined" && (window as unknown as { Iconify?: { scan: () => void } }).Iconify) {
      (window as unknown as { Iconify: { scan: () => void } }).Iconify.scan();
    }
  }, [
    mounted,
    renderedHtml,
    styles.paper,
    styles.marginV,
    styles.marginH,
    styles.fontSize,
    styles.lineHeight,
    styles.fontFamily,
    customCss,
  ]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        setShowHelp((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        window.print();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || "";
      if (file.name.endsWith(".css")) {
        setCustomCss(content);
        setEditorTab("css");
      } else {
        setMarkdown(content);
        setEditorTab("markdown");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Drag and drop upload
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || "";
      if (file.name.endsWith(".css")) {
        setCustomCss(content);
        setEditorTab("css");
      } else {
        setMarkdown(content);
        setEditorTab("markdown");
      }
    };
    reader.readAsText(file);
  };

  // Download markdown
  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download CSS
  const handleDownloadCss = () => {
    const blob = new Blob([customCss], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Template switchers
  const loadTemplate = (type: "generic" | "justin") => {
    if (confirm("Replace current editor content with the selected template?")) {
      if (type === "generic") {
        setMarkdown(GENERIC_RESUME_MARKDOWN);
        setCustomCss(DEFAULT_RESUME_CSS);
        setStyles(DEFAULT_STYLES);
      } else {
        setMarkdown(JUSTIN_RESUME_MARKDOWN);
        setCustomCss(DEFAULT_RESUME_CSS);
        setStyles((prev) => ({ ...prev, paper: "Letter", fontFamily: RESUME_FONTS[0].fontFamily }));
      }
    }
  };

  const currentPaper = PAPER_SIZES[styles.paper] || PAPER_SIZES.A4;

  return (
    <>
      <PageMeta
        title="Markdown Resume | Some(Scripting)"
        description="Write and format ATS-friendly resumes in Markdown with real-time preview, custom typography, and print-ready PDF export."
        path="/tooling/markdown-resume"
      />

      <Head>
        <script src="https://code.iconify.design/2/2.2.1/iconify.min.js" async />
      </Head>

      <div className="resume-builder-page page-shell pb-16">
        {/* Back Link and Header */}
        <div className="resume-tool-header">
          <Link href="/tooling" className="tool-back">
            <ArrowLeft aria-hidden="true" /> Back to tooling
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
            <div>
              <p className="eyebrow">Career utility</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Markdown Resume
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl">
                Write ATS-friendly resumes in Markdown with live preview, smart pagination,
                and direct PDF printing—processed entirely in your browser.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-md font-mono">
                {saveStatus}
              </span>
              <button
                type="button"
                onClick={() => setShowHelp(true)}
                className="reader-help-button !w-9 !h-9"
                title="Keyboard shortcuts (Shift + ?)"
                aria-label="Keyboard shortcuts"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action & Control Bar */}
        <div className="resume-toolbar mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl shadow-xs">
            {/* View switcher */}
            <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border/50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === "split"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setViewMode("editor")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === "editor"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === "preview"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown,.css"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted transition-colors"
                title="Upload Markdown or CSS file"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted transition-colors"
                title="Download Markdown"
              >
                <Download className="w-3.5 h-3.5" />
                <span>.md</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadCss}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted transition-colors"
                title="Download Custom CSS"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>.css</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSettings((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  showSettings
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
                title="Adjust paper margins and typography"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>

              {/* Template Presets */}
              <div className="relative inline-block text-xs">
                <button
                  type="button"
                  onClick={() => loadTemplate("generic")}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground text-xs hover:bg-muted transition-colors"
                  title="Reset to generic ATS template"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Generic</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => loadTemplate("justin")}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground text-xs hover:bg-muted transition-colors"
                title="Load Justin Bender's resume template"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Justin</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 shadow-xs transition-opacity"
                title="Print or export to PDF (Cmd/Ctrl + P)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Collapsible Settings Drawer */}
          {showSettings && (
            <div className="mt-2 p-4 bg-card border border-border rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs animate-in fade-in-50 duration-150">
              {/* Paper Format */}
              <div>
                <label className="font-bold text-foreground block mb-1.5">Paper Size</label>
                <select
                  value={styles.paper}
                  onChange={(e) =>
                    setStyles((prev) => ({ ...prev, paper: e.target.value as PaperType }))
                  }
                  className="w-full bg-background border border-border rounded-md px-2.5 py-1.5 text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="Letter">Letter (8.5 × 11 in)</option>
                  <option value="Legal">Legal</option>
                  <option value="A5">A5</option>
                </select>
              </div>

              {/* Font Family */}
              <div>
                <label className="font-bold text-foreground block mb-1.5">Font Family</label>
                <select
                  value={styles.fontFamily}
                  onChange={(e) =>
                    setStyles((prev) => ({ ...prev, fontFamily: e.target.value }))
                  }
                  className="w-full bg-background border border-border rounded-md px-2.5 py-1.5 text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                >
                  {RESUME_FONTS.map((font) => (
                    <option key={font.name} value={font.fontFamily}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-foreground">Font Size</label>
                  <span className="text-muted-foreground font-mono">{styles.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="11"
                  max="18"
                  step="0.5"
                  value={styles.fontSize}
                  onChange={(e) =>
                    setStyles((prev) => ({ ...prev, fontSize: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-primary"
                />
              </div>

              {/* Line Height */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-foreground">Line Height</label>
                  <span className="text-muted-foreground font-mono">{styles.lineHeight.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1.1"
                  max="1.8"
                  step="0.05"
                  value={styles.lineHeight}
                  onChange={(e) =>
                    setStyles((prev) => ({ ...prev, lineHeight: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-primary"
                />
              </div>

              {/* Vertical Margins */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-foreground">Vertical Margin</label>
                  <span className="text-muted-foreground font-mono">{styles.marginV}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="1"
                  value={styles.marginV}
                  onChange={(e) =>
                    setStyles((prev) => ({ ...prev, marginV: parseInt(e.target.value, 10) }))
                  }
                  className="w-full accent-primary"
                />
              </div>

              {/* Horizontal Margins */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-foreground">Horizontal Margin</label>
                  <span className="text-muted-foreground font-mono">{styles.marginH}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="1"
                  value={styles.marginH}
                  onChange={(e) =>
                    setStyles((prev) => ({ ...prev, marginH: parseInt(e.target.value, 10) }))
                  }
                  className="w-full accent-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Workspace: Editor + Preview */}
        <div
          className={`resume-workspace mt-4 grid gap-6 ${
            viewMode === "split"
              ? "grid-cols-1 lg:grid-cols-12"
              : "grid-cols-1"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          {/* Editor Pane */}
          {(viewMode === "split" || viewMode === "editor") && (
            <div
              className={`resume-editor-card bg-card border ${
                isDragOver ? "border-primary ring-2 ring-primary/20" : "border-border"
              } rounded-xl shadow-xs flex flex-col overflow-hidden ${
                viewMode === "split"
                  ? "lg:col-span-5 xl:col-span-5 h-[calc(100vh-270px)] min-h-[550px]"
                  : "h-[calc(100vh-270px)] min-h-[600px]"
              }`}
            >
              {/* Editor Tabs */}
              <div className="flex items-center justify-between px-3 py-2 bg-muted/40 border-b border-border">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditorTab("markdown")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      editorTab === "markdown"
                        ? "bg-background text-foreground shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Markdown</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab("css")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      editorTab === "css"
                        ? "bg-background text-foreground shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Custom CSS</span>
                  </button>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {editorTab === "markdown"
                    ? `${markdown.split("\n").length} lines`
                    : `${customCss.split("\n").length} lines`}
                </span>
              </div>

              {/* Text Area */}
              <div className="flex-1 relative p-1 bg-background">
                {editorTab === "markdown" ? (
                  <textarea
                    ref={textareaRef}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type or paste your Markdown resume here..."
                    className="w-full h-full p-3 font-mono text-xs sm:text-sm bg-transparent text-foreground border-none resize-none focus:outline-hidden leading-relaxed"
                    spellCheck="false"
                  />
                ) : (
                  <textarea
                    value={customCss}
                    onChange={(e) => setCustomCss(e.target.value)}
                    placeholder="Enter custom CSS rules for #resume-content..."
                    className="w-full h-full p-3 font-mono text-xs sm:text-sm bg-transparent text-foreground border-none resize-none focus:outline-hidden leading-relaxed"
                    spellCheck="false"
                  />
                )}
              </div>
            </div>
          )}

          {/* Preview Pane */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div
              className={`resume-preview-wrapper flex flex-col ${
                viewMode === "split" ? "lg:col-span-7 xl:col-span-7" : "col-span-1"
              }`}
            >
              {/* Preview Bar with Zoom and Page Count */}
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    Preview: {styles.paper}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-mono">
                    {totalPages} {totalPages === 1 ? "page" : "pages"}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-card border border-border rounded-lg px-2 py-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.4, Math.round((z - 0.1) * 10) / 10))}
                    className="p-1 hover:text-primary transition-colors text-muted-foreground"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono px-1 min-w-[3rem] text-center text-foreground">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
                    className="p-1 hover:text-primary transition-colors text-muted-foreground"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={fitToWidth}
                    className="p-1 hover:text-primary transition-colors text-muted-foreground ml-1"
                    title="Fit to Width"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="p-1 hover:text-primary transition-colors text-muted-foreground ml-0.5"
                    title="Reset to 100%"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Viewport container */}
              <div
                ref={previewViewportRef}
                className="resume-paper-viewport bg-muted/50 border border-border rounded-xl p-4 sm:p-6 overflow-auto max-h-[calc(100vh-270px)] min-h-[550px] flex justify-center items-start shadow-inner"
              >
                <div
                  className="resume-paper-zoom-origin transition-transform duration-100 ease-out"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                    width: `${currentPaper.wMm}mm`,
                  }}
                >
                  {/* The actual Paper Sheet */}
                  <div
                    className="resume-paper-sheet"
                    style={{
                      width: `${currentPaper.wMm}mm`,
                      minHeight: `${currentPaper.hMm}mm`,
                    }}
                  >
                    <div
                      id="resume-content"
                      ref={resumeContainerRef}
                      suppressHydrationWarning
                      style={{
                        paddingTop: `${styles.marginV}px`,
                        paddingBottom: `${styles.marginV}px`,
                        paddingLeft: `${styles.marginH}px`,
                        paddingRight: `${styles.marginH}px`,
                        fontFamily: styles.fontFamily,
                        fontSize: `${styles.fontSize}px`,
                        lineHeight: styles.lineHeight,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Modal */}
        {showHelp && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
            onClick={() => setShowHelp(false)}
          >
            <div
              className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Markdown Resume Shortcuts
                </h2>
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span>Export to PDF / Print</span>
                  <kbd className="px-2 py-1 bg-muted border border-border rounded font-mono text-xs">
                    Cmd/Ctrl + P
                  </kbd>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Toggle help dialog</span>
                  <kbd className="px-2 py-1 bg-muted border border-border rounded font-mono text-xs">
                    Shift + ?
                  </kbd>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Insert page break in Markdown</span>
                  <code className="px-2 py-1 bg-muted border border-border rounded font-mono text-xs text-primary">
                    \newpage
                  </code>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Insert custom vertical space</span>
                  <code className="px-2 py-1 bg-muted border border-border rounded font-mono text-xs text-primary">
                    \\[15px]
                  </code>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Two-column / align right definition list</span>
                  <code className="px-2 py-1 bg-muted border border-border rounded font-mono text-xs text-primary">
                    : Company : Date
                  </code>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-xs hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Dynamic & Print Styles */}
      <style jsx global>{`
        /* @font-face declarations for custom bundled fonts */
        @font-face {
          font-family: "CMU Sans Serif";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/resume/cmu-sans-serif/regular.ttf") format("truetype");
        }
        @font-face {
          font-family: "CMU Sans Serif";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/resume/cmu-sans-serif/bold.ttf") format("truetype");
        }
        @font-face {
          font-family: "CMU Sans Serif";
          font-style: italic;
          font-weight: 400;
          src: url("/fonts/resume/cmu-sans-serif/italic.ttf") format("truetype");
        }
        @font-face {
          font-family: "Times Newer Roman";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/resume/times-newer-roman/regular.otf") format("opentype");
        }
        @font-face {
          font-family: "Times Newer Roman";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/resume/times-newer-roman/bold.otf") format("opentype");
        }
        @font-face {
          font-family: "Adobe Garamond Pro";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/resume/adobe-garamond-pro/regular.ttf") format("truetype");
        }
        @font-face {
          font-family: "Adobe Garamond Pro";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/resume/adobe-garamond-pro/bold.ttf") format("truetype");
        }
        @font-face {
          font-family: "Minion Pro";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/resume/minion-pro/regular.otf") format("opentype");
        }
        @font-face {
          font-family: "Minion Pro";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/resume/minion-pro/bold.otf") format("opentype");
        }
        @font-face {
          font-family: "Tex Gyre Pagella";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/resume/tex-gyre-pagella/regular.otf") format("opentype");
        }
        @font-face {
          font-family: "Tex Gyre Pagella";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/resume/tex-gyre-pagella/bold.otf") format("opentype");
        }
        @font-face {
          font-family: "Euclid";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/resume/euclid/regular.ttf") format("truetype");
        }
        @font-face {
          font-family: "Euclid";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/resume/euclid/bold.ttf") format("truetype");
        }

        .resume-paper-sheet {
          background-color: #ffffff;
          color: #000000;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        /* Screen representation of page breaks */
        .resume-page-break {
          border-top: 6px dashed #cbd5e1;
          margin-bottom: 24px;
          position: relative;
          background: #f8fafc;
        }

        .resume-page-break-indicator {
          position: absolute;
          right: 12px;
          top: -10px;
          background: #64748b;
          color: #ffffff;
          font-size: 10px;
          font-family: monospace;
          padding: 1px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        /* Injected Custom CSS from the user */
        ${customCss}

        /* Alias #vue-smart-pages-preview to #resume-content for full compatibility */
        #resume-content {
          background-color: white;
          color: black;
        }

        /* PRINT STYLES */
        @media print {
          @page {
            margin: 0;
            size: auto;
          }

          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .site-header,
          .site-footer,
          .resume-tool-header,
          .resume-toolbar,
          .resume-editor-card,
          .resume-preview-wrapper > div:first-child,
          .resume-page-break-indicator {
            display: none !important;
          }

          .resume-builder-page,
          .resume-workspace,
          .resume-preview-wrapper,
          .resume-paper-viewport,
          .resume-paper-zoom-origin {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            background: transparent !important;
            overflow: visible !important;
            max-height: none !important;
            transform: none !important;
            display: block !important;
            width: 100% !important;
            box-shadow: none !important;
          }

          .resume-paper-sheet {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
          }

          #resume-content {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .resume-page-break {
            page-break-before: always !important;
            break-before: page !important;
            margin-top: 0 !important;
            padding-bottom: 0 !important;
            border: none !important;
            height: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
