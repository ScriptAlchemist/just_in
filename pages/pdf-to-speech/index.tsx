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
  const [showVoicesModal, setShowVoicesModal] =
    useState<boolean>(false);
  const [savedProgress, setSavedProgress] = useState<{
    pdfName: string;
    chunk: number;
    timestamp: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCancellingRef = useRef<boolean>(false);
  const isCreatingUtteranceRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isAudioPrimed, setIsAudioPrimed] = useState<boolean>(false);
  const chunkRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const extractedTextContainerRef = useRef<HTMLDivElement | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("pdf-speech-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedProgress(parsed);
        console.log("📖 Saved progress found:", parsed);
      } catch (err) {
        console.error("Failed to parse saved progress:", err);
      }
    }
  }, []);

  // Save progress whenever chunk changes
  useEffect(() => {
    if (file && currentChunk > 0 && chunks.length > 0) {
      const progressData = {
        pdfName: file.name,
        chunk: currentChunk,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        "pdf-speech-progress",
        JSON.stringify(progressData),
      );
      console.log("💾 Progress saved:", progressData);
    }
  }, [currentChunk, file, chunks.length]);

  // Load available voices (American English only)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices();

      // If no voices are loaded yet, they might load asynchronously
      if (availableVoices.length === 0) {
        // Try again in a bit
        timeoutId = setTimeout(loadVoices, 100);
        return;
      }

      // iOS lies about available voices - filter to only ones that actually work
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;
      const iOSVoiceNames = [
        "Ava (Enhanced)",
        "Ava (Premium)",
        "Evan (Enhanced)",
        "Ava",
        "Evan",
        "Samantha",
        "Daniel",
        "Rishi",
        "Moira",
        "Tessa",
        "Mónica",
        "Paulina",
        "Satu",
        "Amélie",
        "Thomas",
        "Carmit",
        "Lekha",
        "Mariska",
        "Damayanti",
        "Alice",
        "Kyoko",
        "Yuna",
        "Ellen",
        "Xander",
        "Nora",
        "Zosia",
        "Luciana",
        "Joana",
        "Ioana",
        "Milena",
        "Laura",
        "Alva",
        "Kanya",
        "Yelda",
        "Tian-Tian",
        "Sin-Ji",
        "Mei-Jia",
        "Alex",
      ];

      // if (isIOS) {
      //   availableVoices = availableVoices.filter((voice) =>
      //     iOSVoiceNames.includes(voice.name),
      //   );
      // }

      // Filter to only American English voices (en-US variants) and Enhanced/Premium voices
      const americanVoices = availableVoices.filter(
        (voice) =>
          voice.lang.startsWith("en-US") ||
          voice.lang === "en_US" ||
          voice.name.includes("Enhanced") ||
          voice.name.includes("Premium"),
      );

      setVoices(americanVoices);

      // Default to Samantha if available
      if (americanVoices.length > 0) {
        const samanthaIndex = americanVoices.findIndex(
          (v) => v.name === "Samantha",
        );
        if (samanthaIndex !== -1) {
          setSelectedVoice(samanthaIndex);
          console.log("✅ Defaulted to Samantha voice");
        }
      }
    };

    // Try to load voices immediately
    loadVoices();

    // Set up the event listener for when voices change
    // This is necessary because voices might not be loaded yet
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Also try after a short delay (for browsers that don't fire the event)
    timeoutId = setTimeout(loadVoices, 5000);

    // Cleanup: Cancel speech and remove event listener when component unmounts
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
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

  // Auto-scroll to current chunk within the container
  useEffect(() => {
    if (
      currentChunk >= 0 &&
      chunkRefs.current[currentChunk] &&
      extractedTextContainerRef.current &&
      (isSpeaking || isPaused)
    ) {
      const chunkElement = chunkRefs.current[currentChunk];
      const container = extractedTextContainerRef.current;

      if (chunkElement) {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          // Calculate the position relative to the container
          const relativeTop =
            chunkElement.offsetTop - container.offsetTop;

          container.scrollTo({
            top: relativeTop,
            behavior: "smooth",
          });

          console.log(`📜 Scrolled to chunk ${currentChunk}`);
        }, 50);
      }
    }
  }, [currentChunk, isSpeaking, isPaused]);

  // ---------- Text processing ----------
  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/\n+/g, " ") // Replace multiple newlines with space
      .replace(/#+/g, "") // Remove markdown headers
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();
  };

  const splitTextIntoChunks = (text: string): string[] => {
    // Split by sentence endings but keep the punctuation
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

    // Use single sentences to avoid browser timeout issues
    const result: string[] = [];
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (trimmed && trimmed.length > 3) {
        result.push(trimmed);
      }
    }

    // If no sentences found, split by length
    if (result.length === 0 && text.length > 0) {
      const maxLength = 200;
      for (let i = 0; i < text.length; i += maxLength) {
        const chunk = text.substring(i, i + maxLength).trim();
        if (chunk) result.push(chunk);
      }
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

      // Check if we have saved progress for this PDF
      if (savedProgress && savedProgress.pdfName === pdfFile.name) {
        console.log(
          `📖 Restoring progress for "${pdfFile.name}" at chunk ${savedProgress.chunk}`,
        );
        setCurrentChunk(savedProgress.chunk);
        setError(
          `Restored progress: Starting from chunk ${savedProgress.chunk + 1}/${textChunks.length}`,
        );
        // Clear error after showing it
        setTimeout(() => setError(""), 5000);
      }

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

    // Guard against duplicate simultaneous creation
    if (isCreatingUtteranceRef.current) {
      console.log(
        "⚠️ Already creating utterance, skipping duplicate call",
      );
      return;
    }

    console.log("=== SPEAK CHUNK DEBUG ===");
    console.log("Chunk index:", chunkIndex);
    console.log("Total chunks:", chunks.length);
    console.log("Text preview:", chunks[chunkIndex]?.substring(0, 50));

    // Force complete cancellation first (Arc browser workaround)
    console.log("Canceling before chunk...");
    isCreatingUtteranceRef.current = true;
    window.speechSynthesis.cancel();

    // Check if still busy after cancel
    if (
      window.speechSynthesis.speaking ||
      window.speechSynthesis.pending
    ) {
      console.log("Still busy after cancel, waiting longer...");
      window.speechSynthesis.cancel();
      window.speechSynthesis.cancel();
    }

    // Increased delay to let Arc's audio system reset (100ms instead of 50ms)
    setTimeout(() => {
      if (!isCreatingUtteranceRef.current) {
        console.log("⚠️ Creation was canceled, aborting");
        return;
      }

      console.log("=== CREATING UTTERANCE ===");
      console.log("Available voices:", voices.length);
      console.log("Selected voice index:", selectedVoice);
      console.log("Selected voice:", voices[selectedVoice]);
      console.log("Rate:", rate, "Pitch:", pitch);

      const utterance = new SpeechSynthesisUtterance(
        chunks[chunkIndex],
      );
      if (voices.length > 0 && voices[selectedVoice]) {
        utterance.voice = voices[selectedVoice];
        console.log("Voice set to:", utterance.voice?.name);
      } else {
        console.warn("No voice selected, using default");
      }
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1.0; // Ensure volume is max

      console.log("=== AUDIO SETTINGS ===");
      console.log("Volume:", utterance.volume);
      console.log("Rate:", utterance.rate);
      console.log("Pitch:", utterance.pitch);

      utterance.onstart = () => {
        console.log(
          "✅ Speech started successfully for chunk",
          chunkIndex,
        );
        console.log("🔊 AUDIO SHOULD BE PLAYING NOW!");
        console.log("If you hear nothing:");
        console.log("1. Check Arc's volume mixer in system settings");
        console.log("2. Check if Arc site has audio permissions");
        console.log(
          "3. Try a different voice (Samantha instead of Tom)",
        );
        console.log("4. Check system Sound settings for output device");
        isCreatingUtteranceRef.current = false;
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentChunk(chunkIndex);
      };

      utterance.onend = () => {
        console.log("✅ Speech ended for chunk", chunkIndex);
        isCreatingUtteranceRef.current = false;
        speakChunk(chunkIndex + 1);
      };

      utterance.onerror = (event) => {
        console.error("=== SPEECH ERROR DEBUG ===");
        console.error("Full event:", event);
        console.error("Error type:", event.error);
        console.error("Char index:", event.charIndex);
        console.error("Elapsed time (ms):", event.elapsedTime);
        console.error("isCancellingRef:", isCancellingRef.current);
        console.error("Chunk index:", chunkIndex);
        console.error(
          "Chunk text preview:",
          chunks[chunkIndex]?.substring(0, 50),
        );
        console.error("Selected voice:", voices[selectedVoice]?.name);
        console.error(
          "speechSynthesis.speaking:",
          window.speechSynthesis.speaking,
        );
        console.error(
          "speechSynthesis.pending:",
          window.speechSynthesis.pending,
        );
        console.error(
          "speechSynthesis.paused:",
          window.speechSynthesis.paused,
        );

        // If error happens very quickly (under 1 second), it's likely a voice loading issue
        if (event.elapsedTime < 1000 && event.error === "canceled") {
          console.error(
            "Speech canceled immediately - stopping to prevent loop",
          );
          console.error("⚠️ POSSIBLE CAUSES:");
          console.error("1. Ghost utterances from previous attempts");
          console.error("2. Voice not properly loaded");
          console.error("3. Arc's speech queue is corrupted");
          console.error("");
          console.error("🔧 TRY THIS:");
          console.error(
            "1peech failed to start. Try selecting a different voice or reloading the page.",
          );
          setIsSpeaking(false);
          setIsPaused(false);
          isCancellingRef.current = false;
          isCreatingUtteranceRef.current = false;
          return;
        }

        // If it's just a "canceled" error after some speech, continue to next chunk
        if (event.error === "canceled" && !isCancellingRef.current) {
          console.log(
            "Speech was canceled mid-way, moving to next chunk",
          );
          isCreatingUtteranceRef.current = false;
          speakChunk(chunkIndex + 1);
          return;
        }

        // Only show error if it wasn't an intentional cancellation
        if (!isCancellingRef.current) {
          setError(`Speech error: ${event.error || "unknown error"}`);
        }
        setIsSpeaking(false);
        setIsPaused(false);
        isCancellingRef.current = false;
        isCreatingUtteranceRef.current = false;
      };

      utteranceRef.current = utterance;

      console.log("=== CALLING speechSynthesis.speak() ===");
      console.log(
        "speechSynthesis.speaking (before):",
        window.speechSynthesis.speaking,
      );
      console.log(
        "speechSynthesis.pending (before):",
        window.speechSynthesis.pending,
      );
      console.log(
        "speechSynthesis.paused (before):",
        window.speechSynthesis.paused,
      );

      window.speechSynthesis.speak(utterance);

      // Check state immediately after speak call
      setTimeout(() => {
        console.log("=== STATE CHECK (100ms after speak) ===");
        console.log(
          "speechSynthesis.speaking:",
          window.speechSynthesis.speaking,
        );
        console.log(
          "speechSynthesis.pending:",
          window.speechSynthesis.pending,
        );
        console.log(
          "speechSynthesis.paused:",
          window.speechSynthesis.paused,
        );

        // If not speaking after 100ms, something went wrong
        if (
          !window.speechSynthesis.speaking &&
          !isCancellingRef.current
        ) {
          console.error("❌ Speech did not start! Possible Arc issue.");
          setError(
            "Speech failed to start. Try stopping all speech first, then clicking Play again.",
          );
        }
      }, 100);
    }, 100);
  };

  const speak = () => {
    if (!extractedText || chunks.length === 0) {
      setError("No text to read. Please upload a PDF first.");
      return;
    }

    console.log("=== SPEAK BUTTON CLICKED ===");
    console.log("Current chunk:", currentChunk);
    console.log("Total chunks:", chunks.length);
    console.log("Is paused:", isPaused);
    console.log("Is speaking:", isSpeaking);

    console.log("=== CHECKING SPEECH SYNTHESIS STATE ===");
    console.log(
      "speechSynthesis.speaking:",
      window.speechSynthesis.speaking,
    );
    console.log(
      "speechSynthesis.pending:",
      window.speechSynthesis.pending,
    );
    console.log(
      "speechSynthesis.paused:",
      window.speechSynthesis.paused,
    );

    // Check if Arc has ghost utterances running
    if (window.speechSynthesis.speaking && !isSpeaking && !isPaused) {
      console.error("❌ ARC HAS GHOST UTTERANCES RUNNING!");
      console.error(
        "Arc's speech queue is corrupted with old utterances.",
      );
      console.error("SOLUTION: Reload the page (Cmd+Shift+R)");
      setError(
        "Arc browser has ghost utterances. Please reload the page (Cmd+Shift+R) and try again.",
      );
      return;
    }

    // NUCLEAR OPTION FOR ARC - Cancel multiple times with delays
    console.log("Performing nuclear cancel...");
    window.speechSynthesis.cancel();

    setTimeout(() => {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.cancel();

        // Poll until Arc is truly ready (max 2 seconds)
        let attempts = 0;
        const maxAttempts = 20;

        const pollUntilReady = () => {
          attempts++;
          console.log(`Polling attempt ${attempts}/${maxAttempts}`);
          console.log("  speaking:", window.speechSynthesis.speaking);
          console.log("  pending:", window.speechSynthesis.pending);

          if (
            !window.speechSynthesis.speaking &&
            !window.speechSynthesis.pending
          ) {
            console.log("✅ Arc is ready! Starting speech...");

            if (isPaused) {
              console.log(
                "▶️ Resuming from pause at chunk:",
                currentChunk,
              );
              // Don't use resume() - Arc doesn't handle it well
              // Instead, restart from current chunk
              setIsPaused(false);
              console.log(
                "Restarting speech from chunk:",
                currentChunk,
              );
              speakChunk(currentChunk);

              // Force scroll update on resume
              setTimeout(() => {
                if (
                  chunkRefs.current[currentChunk] &&
                  extractedTextContainerRef.current
                ) {
                  const chunkElement = chunkRefs.current[currentChunk];
                  const container = extractedTextContainerRef.current;
                  const relativeTop =
                    chunkElement.offsetTop - container.offsetTop;
                  container.scrollTo({
                    top: relativeTop,
                    behavior: "smooth",
                  });
                  console.log(
                    `📜 Re-scrolled to chunk ${currentChunk} on resume`,
                  );
                }
              }, 100);
            } else {
              console.log("Starting speech from chunk:", currentChunk);
              speakChunk(currentChunk);
            }
          } else if (attempts < maxAttempts) {
            console.log("⏳ Arc still busy, waiting 100ms more...");
            window.speechSynthesis.cancel(); // Cancel again
            setTimeout(pollUntilReady, 100);
          } else {
            console.error("❌ Arc won't clear after 2 seconds!");
            setError(
              "Arc browser audio stuck. Please reload the page and try again.",
            );
          }
        };

        pollUntilReady();
      }, 100);
    }, 100);
  };

  const pause = () => {
    // Arc doesn't handle pause/resume well, so we cancel instead
    console.log("⏸️ Pausing at chunk:", currentChunk);
    isCancellingRef.current = true;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      isCancellingRef.current = false;
    }, 100);
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const stop = () => {
    isCancellingRef.current = true;
    isCreatingUtteranceRef.current = false;
    window.speechSynthesis.cancel();
    // Force a complete reset
    setTimeout(() => {
      window.speechSynthesis.cancel();
    }, 100);
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentChunk(0);
    // Clear saved progress when user stops
    if (file) {
      localStorage.removeItem("pdf-speech-progress");
      setSavedProgress(null);
      console.log("🗑️ Progress cleared");
    }
  };

  const primeAudioContext = () => {
    console.log("=== PRIMING AUDIO CONTEXT ===");
    try {
      // Create and play silent audio to unlock Arc's autoplay
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;
      console.log("AudioContext state:", ctx.state);

      if (ctx.state === "suspended") {
        ctx.resume().then(() => {
          console.log("✅ AudioContext resumed");
        });
      }

      // Play a silent tone to unlock audio
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0; // Silent
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start(0);
      oscillator.stop(ctx.currentTime + 0.1);

      console.log(
        "✅ Silent audio played - Arc audio should be unlocked",
      );
      setIsAudioPrimed(true);

      // Also try speaking empty text to prime speech synthesis
      const primer = new SpeechSynthesisUtterance(" ");
      primer.volume = 0;
      window.speechSynthesis.speak(primer);
      console.log("✅ Speech synthesis primed");
    } catch (err) {
      console.error("❌ Failed to prime audio:", err);
    }
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

              {/* Saved Progress Indicator */}
              {savedProgress &&
                file &&
                savedProgress.pdfName === file.name && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                          📖 Saved Progress Found
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                          Chunk {savedProgress.chunk + 1} of{" "}
                          {totalChunks} •{" "}
                          {new Date(
                            savedProgress.timestamp,
                          ).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentChunk(savedProgress.chunk);
                          setError(
                            `Jumped to saved position: chunk ${savedProgress.chunk + 1}`,
                          );
                          setTimeout(() => setError(""), 3000);
                        }}
                        className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                      >
                        Jump to
                      </button>
                    </div>
                  </div>
                )}

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

              {/* Debug Panel for Arc Browser */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  🔧 Debug Info (Arc Browser Troubleshooting)
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Available Voices:
                    </span>
                    <span className="font-mono font-semibold">
                      {voices.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Selected Voice:
                    </span>
                    <span className="font-mono text-xs">
                      {voices[selectedVoice]?.name || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Browser:
                    </span>
                    <span className="font-mono text-xs">
                      {navigator.userAgent.includes("Arc")
                        ? "Arc"
                        : "Other"}
                    </span>
                  </div>
                </div>

                {/* Simple Test Button */}
                <button
                  onClick={() => {
                    console.log("=== SIMPLE TEST SPEECH ===");
                    console.log("Creating test utterance...");
                    const test = new SpeechSynthesisUtterance(
                      "Testing one two three",
                    );
                    test.volume = 1.0;
                    test.rate = 1.0;
                    test.pitch = 1.0;
                    console.log("Test utterance created");
                    console.log("Volume:", test.volume);
                    console.log("Calling speak...");
                    window.speechSynthesis.speak(test);
                    console.log("Speak called");
                    console.log(
                      "🔊 You should hear 'Testing one two three'",
                    );
                    console.log("If you hear nothing, check:");
                    console.log(
                      "- System Sound preferences (Arc not muted)",
                    );
                    console.log(
                      "- Arc site permissions (Sound allowed)",
                    );
                    console.log("- Output device is correct");

                    test.onstart = () => {
                      console.log("✅ Test speech started!");
                      console.log("🔊 AUDIO IS PLAYING RIGHT NOW!");
                    };
                    test.onend = () =>
                      console.log("✅ Test speech ended!");
                    test.onerror = (e) =>
                      console.error("❌ Test speech error:", e.error);
                  }}
                  className="mt-3 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  🧪 Test Simple Speech (Check Console)
                </button>

                <button
                  onClick={() => setShowVoicesModal(true)}
                  className="mt-2 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  📋 Show All Voices
                </button>

                <button
                  onClick={() => {
                    console.log("=== SYSTEM AUDIO CHECK ===");
                    console.log(
                      "Browser:",
                      navigator.userAgent.includes("Arc")
                        ? "Arc"
                        : navigator.userAgent.split("/").pop(),
                    );
                    console.log("Platform:", navigator.platform);
                    console.log(
                      "Available voices:",
                      window.speechSynthesis.getVoices().length,
                    );
                    console.log(
                      "speechSynthesis API available:",
                      typeof window.speechSynthesis !== "undefined",
                    );
                    console.log("");
                    console.log("⚠️ CHECK THESE IN macOS:");
                    console.log(
                      "1. System Settings → Sound → Output device",
                    );
                    console.log(
                      "2. System Settings → Sound → Arc volume slider",
                    );
                    console.log(
                      "3. Right-click Arc in Dock → check if muted",
                    );
                    console.log(
                      "4. Arc → Site permissions for this URL",
                    );
                  }}
                  className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  🔊 Check Audio Settings
                </button>

                <button
                  onClick={primeAudioContext}
                  className={`mt-2 w-full px-4 py-2 ${isAudioPrimed ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white text-sm font-medium rounded-lg transition-colors`}
                >
                  {isAudioPrimed
                    ? "✅ Audio Unlocked"
                    : "🔓 Unlock Arc Audio (Click First!)"}
                </button>

                <button
                  onClick={() => {
                    console.log("=== FORCE PAGE RELOAD ===");
                    console.log(
                      "This will clear Arc's corrupted speech queue.",
                    );
                    window.location.reload();
                  }}
                  className="mt-2 w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  🔄 Reload Page (Fix Ghost Utterances)
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("pdf-speech-progress");
                    setSavedProgress(null);
                    setCurrentChunk(0);
                    console.log("🗑️ Progress cleared manually");
                    setError("Progress cleared!");
                    setTimeout(() => setError(""), 2000);
                  }}
                  className="mt-2 w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  🗑️ Clear Saved Progress
                </button>

                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    ⚠️ Arc Browser Issue Detected
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Arc keeps old utterances in memory. If you see
                    "ghost utterances" error or no audio plays:
                  </p>
                  <ol className="list-decimal ml-4 mt-2 text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>Click "🔄 Reload Page" button above</li>
                    <li>Upload your PDF again</li>
                    <li>Click "Stop All Speech" once</li>
                    <li>Wait 2 seconds</li>
                    <li>Click Play - should work!</li>
                  </ol>
                </div>

                <button
                  onClick={() => {
                    console.log("=== EMERGENCY STOP ALL SPEECH ===");
                    isCancellingRef.current = true;
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.cancel();
                    setTimeout(() => {
                      window.speechSynthesis.cancel();
                      console.log("Speech queue cleared");
                      console.log(
                        "speechSynthesis.speaking:",
                        window.speechSynthesis.speaking,
                      );
                      console.log(
                        "speechSynthesis.pending:",
                        window.speechSynthesis.pending,
                      );
                      isCancellingRef.current = false;
                      setIsSpeaking(false);
                      setIsPaused(false);
                    }, 100);
                  }}
                  className="mt-2 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  🛑 Stop All Speech (Emergency Reset)
                </button>
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
                ref={extractedTextContainerRef}
                className="max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-sm leading-relaxed"
                role="region"
                aria-label="Extracted document text"
                tabIndex={0}
              >
                {chunks.map((chunk, index) => (
                  <p
                    key={index}
                    ref={(el) => {
                      chunkRefs.current[index] = el;
                    }}
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

          {/* Voices Modal */}
          {showVoicesModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowVoicesModal(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold">
                    Available Voices (
                    {window.speechSynthesis.getVoices().length})
                  </h2>
                  <button
                    onClick={() => setShowVoicesModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
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
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-2">
                    {window.speechSynthesis
                      .getVoices()
                      .map((voice, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            voices[selectedVoice]?.voiceURI ===
                            voice.voiceURI
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-lg">
                                {voice.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                                  {voice.lang}
                                </span>
                                {voice.default && (
                                  <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs">
                                    Default
                                  </span>
                                )}
                                {voice.localService && (
                                  <span className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded text-xs">
                                    Local
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-mono">
                                {voice.voiceURI}
                              </div>
                            </div>
                            {voices[selectedVoice]?.voiceURI ===
                              voice.voiceURI && (
                              <div className="ml-4 text-blue-600 dark:text-blue-400">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <button
                    onClick={() => setShowVoicesModal(false)}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfToSpeech;
