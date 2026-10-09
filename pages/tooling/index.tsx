import { ArrowUpRight, FileCode, FileText } from "lucide-react";
import Link from "next/link";
import PageMeta from "../../components/page-meta";

export default function Tooling() {
  return (
    <>
      <PageMeta
        title="Tooling | Some(Scripting)"
        description="Practical browser tools built by Justin Bender, including an accessible PDF-to-speech reader and ATS Markdown resume builder."
        path="/tooling"
      />
      <div className="tooling-page page-shell">
        <header className="directory-header">
          <p className="eyebrow">Useful software</p>
          <h1>Tools for real work.</h1>
          <p>
            Small, focused utilities designed to remove friction and make
            everyday technical work more accessible.
          </p>
        </header>

        <section className="tool-grid" aria-label="Available tools">
          <article className="tool-card">
            <div className="tool-card-icon">
              <FileCode aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Career</p>
              <h2>Markdown Resume</h2>
              <p>
                Write and format ATS-friendly resumes in Markdown with real-time
                preview, custom typography, LaTeX math, and print-ready PDF export.
              </p>
            </div>
            <Link href="/tooling/markdown-resume" className="text-link">
              Open Markdown Resume <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>

          <article className="tool-card">
            <div className="tool-card-icon">
              <FileText aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Accessibility</p>
              <h2>PDF to Speech</h2>
              <p>
                Upload a PDF, extract its text, and listen with browser speech
                controls, voice selection, progress tracking, and keyboard
                shortcuts.
              </p>
            </div>
            <Link href="/tooling/pdf-to-speech" className="text-link">
              Open PDF to Speech <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>
        </section>
      </div>
    </>
  );
}
