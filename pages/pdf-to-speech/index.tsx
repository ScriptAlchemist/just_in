import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { Buffer } from "buffer";
import { Slider } from "../../components/ui/slider";

const PdfToSpeech = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [currentChunk, setCurrentChunk] = useState<number>(0);
  const [totalChunks, setTotalChunks] = useState<number>(0);
  const [chunks, setChunks] = useState<string[]>([]);
  const [showKeyboardHelp, setShowKeyboardHelp] =
    useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCancellingRef = useRef<boolean>(false);

  // Load available voices (American English only)
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      // Filter to only American English voices (en-US variants) and Enhanced/Premium voices
      const americanVoices = availableVoices.filter(
        (voice) =>
          voice.lang.startsWith("en-US") ||
          voice.lang === "en_US" ||
          voice.name.includes("Enhanced") ||
          voice.name.includes("Premium"),
      );

      setVoices(americanVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup: Cancel speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // ---------- Keyboard shortcuts ----------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      switch (e.key) {
        case " ":
          e.preventDefault();
          if (!extractedText) return;
          if (isSpeaking) {
            pause();
          } else if (isPaused) {
            speak();
          } else {
            speak();
          }
          break;
        case "ArrowRight":
          if (extractedText && !e.shiftKey) {
            e.preventDefault();
            goToNext();
          }
          break;
        case "ArrowLeft":
          if (extractedText && !e.shiftKey) {
            e.preventDefault();
            goToPrevious();
          }
          break;
        case "?":
          if (e.shiftKey) setShowKeyboardHelp((prev) => !prev);
          break;
        case "Escape":
          if (isSpeaking || isPaused) stop();
          if (showKeyboardHelp) setShowKeyboardHelp(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [extractedText, isSpeaking, isPaused, showKeyboardHelp]);

  // ---------- Error auto-dismiss ----------
  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current)
        clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setError(""), 5000);
    }
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }
    };
  }, [error]);

  // ---------- Text processing ----------
  const cleanTextForSpeech = (text: string): string => text.trim();

  const splitTextIntoChunks = (text: string): string[] => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunkSize = 3;
    const result: string[] = [];
    for (let i = 0; i < sentences.length; i += chunkSize) {
      const chunk = sentences
        .slice(i, i + chunkSize)
        .join(" ")
        .trim();
      if (chunk) result.push(chunk);
    }
    return result;
  };

  // ---------- File handling ----------
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file");
      return;
    }

    setFile(selectedFile);
    clearError();
    setExtractedText("");
    setProgress(0);
    setCurrentChunk(0);
    await extractTextFromPdf(selectedFile);
  };

  const clearError = () => {
    setError("");
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
  };

  const extractTextFromPdf = async (pdfFile: File) => {
    setIsExtracting(true);
    clearError();

    try {
      const pdf2md = (await import("@opendocsg/pdf2md")).default;
      const arrayBuffer = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const markdownText = await pdf2md(buffer);
      const cleanedText = cleanTextForSpeech(markdownText);
      setExtractedText(cleanedText);

      const textChunks = splitTextIntoChunks(cleanedText);
      setChunks(textChunks);
      setTotalChunks(textChunks.length);

      setProgress(100);
      setIsExtracting(false);
    } catch (err) {
      console.error("Error extracting text:", err);
      setError(
        "Failed to extract text from PDF. Please try another file.",
      );
      setIsExtracting(false);
    }
  };

  // ---------- Speech controls ----------
  const speakChunk = (chunkIndex: number) => {
    if (chunkIndex >= chunks.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentChunk(0);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
    if (voices.length > 0 && voices[selectedVoice]) {
      utterance.voice = voices[selectedVoice];
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentChunk(chunkIndex);
    };

    utterance.onend = () => {
      speakChunk(chunkIndex + 1);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      if (!isCancellingRef.current)
        setError("An error occurred during speech synthesis.");
      setIsSpeaking(false);
      setIsPaused(false);
      isCancellingRef.current = false;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speak = () => {
    if (!extractedText || chunks.length === 0) {
      setError("No text to read. Please upload a PDF first.");
      return;
    }

    // If speechSynthesis is stuck (not speaking but also not ready), reset it
    if (
      !window.speechSynthesis.speaking &&
      window.speechSynthesis.pending
    ) {
      console.log("SpeechSynthesis stuck, resetting...");
      window.speechSynthesis.cancel();
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }
    speakChunk(currentChunk);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const stop = () => {
    isCancellingRef.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentChunk(0);
  };

  const seekToChunk = (chunkIndex: number) => {
    setCurrentChunk(chunkIndex);
    if (isSpeaking || isPaused) {
      isCancellingRef.current = true;
      speakChunk(chunkIndex);
    }
  };

  const goToPrevious = () => {
    const newChunk = Math.max(0, currentChunk - 1);
    seekToChunk(newChunk);
  };

  const goToNext = () => {
    const newChunk = Math.min(chunks.length - 1, currentChunk + 1);
    seekToChunk(newChunk);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      clearError();
      setExtractedText("");
      setProgress(0);
      setCurrentChunk(0);
      extractTextFromPdf(droppedFile);
    } else {
      setError("Please drop a valid PDF file");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const progressPercentage =
    totalChunks > 0 ? (currentChunk / totalChunks) * 100 : 0;

  return (
    <>
      <Head>
        <title>PDF to Speech - Accessible Document Reader</title>
        <meta
          name="description"
          content="Convert PDF documents to speech for accessible reading"
        />
      </Head>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl font-bold">
                PDF to Speech Reader
              </h1>
              <button
                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Toggle keyboard shortcuts help"
                title="Keyboard shortcuts (Shift + ?)"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Upload a PDF document and have it read aloud to you
            </p>
          </div>

          {showKeyboardHelp && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setShowKeyboardHelp(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close keyboard shortcuts"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs shadow-sm">
                    Space
                  </kbd>
                  <span>Play / Pause</span>
                </div>
                <div className="flex items-center gap-3">
                  <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs shadow-sm">
                    →
                  </kbd>
                  <span>Next section</span>
                </div>
                <div className="flex items-center gap-3">
                  <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs shadow-sm">
                    ←
                  </kbd>
                  <span>Previous section</span>
                </div>
                <div className="flex items-center gap-3">
                  <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs shadow-sm">
                    Esc
                  </kbd>
                  <span>Stop playback</span>
                </div>
                <div className="flex items-center gap-3">
                  <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs shadow-sm">
                    Shift + ?
                  </kbd>
                  <span>Toggle this help</span>
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 mb-6 text-center hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            role="button"
            tabIndex={0}
            aria-label="File upload area. Click to select a PDF file or drag and drop"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                fileInputRef.current?.click();
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              aria-label="PDF file input"
            />

            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {file ? (
                <span className="font-semibold">{file.name}</span>
              ) : (
                <>
                  <span className="font-semibold">Click to upload</span>{" "}
                  or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PDF files only
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6 flex items-start justify-between gap-3"
              role="alert"
              aria-live="polite"
            >
              <p className="flex-1">{error}</p>
              <button
                onClick={clearError}
                className="text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 transition-colors flex-shrink-0"
                aria-label="Dismiss error message"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Extraction Progress */}
          {isExtracting && (
            <div className="mb-6" role="status" aria-live="polite">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Extracting text...
                </span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          )}

          {/* Voice Controls */}
          {extractedText && !isExtracting && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Voice Settings
              </h2>

              <div className="space-y-4">
                {/* Voice Selection */}
                <div>
                  <label
                    htmlFor="voice-select"
                    className="block text-sm font-medium mb-2"
                  >
                    Voice
                  </label>
                  <select
                    id="voice-select"
                    value={selectedVoice}
                    onChange={(e) =>
                      setSelectedVoice(Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSpeaking}
                  >
                    {voices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Speed */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Speed: {rate.toFixed(1)}x
                  </label>
                  <Slider
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[rate]}
                    onValueChange={(v) => setRate(v[0])}
                    className="w-full"
                  />
                </div>

                {/* Pitch */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pitch: {pitch.toFixed(1)}
                  </label>
                  <Slider
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[pitch]}
                    onValueChange={(v) => setPitch(v[0])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Seek Slider */}
              {totalChunks > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Progress
                    </span>
                    <span className="text-sm font-medium">
                      {currentChunk + 1} / {totalChunks}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={totalChunks - 1}
                    step={1}
                    value={[currentChunk]}
                    onValueChange={(value) => seekToChunk(value[0])}
                    className="w-full"
                    aria-label="Seek position in document"
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={goToPrevious}
                  disabled={currentChunk === 0}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Go to previous section"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentChunk >= chunks.length - 1}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Go to next section"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </button>
              </div>

              {/* Playback */}
              <div
                className="flex gap-3 mt-6"
                role="group"
                aria-label="Playback controls"
              >
                {!isSpeaking && !isPaused && (
                  <button
                    onClick={speak}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Start reading document"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Play
                    </span>
                  </button>
                )}

                {isSpeaking && (
                  <button
                    onClick={pause}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    aria-label="Pause reading"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                      </svg>
                      Pause
                    </span>
                  </button>
                )}

                {isPaused && (
                  <button
                    onClick={speak}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Resume reading"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Resume
                    </span>
                  </button>
                )}

                {(isSpeaking || isPaused) && (
                  <button
                    onClick={stop}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="Stop reading"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.25 3A2.25 2.25 0 003 5.25v9.5A2.25 2.25 0 005.25 17h9.5A2.25 2.25 0 0017 14.75v-9.5A2.25 2.25 0 0014.75 3h-9.5z" />
                      </svg>
                      Stop
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && !isExtracting && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Extracted Text
              </h2>
              <div
                className="max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-sm leading-relaxed"
                role="region"
                aria-label="Extracted document text"
                tabIndex={0}
              >
                {chunks.map((chunk, index) => (
                  <p
                    key={index}
                    className={`mb-3 p-2 rounded transition-colors ${
                      index === currentChunk && (isSpeaking || isPaused)
                        ? "bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500"
                        : ""
                    }`}
                  >
                    {chunk}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfToSpeech;
