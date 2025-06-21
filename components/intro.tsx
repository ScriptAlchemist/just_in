//import { CMS_NAME } from '../lib/constants'
import { useState } from "react";
import { useTypewriter } from "react-simple-typewriter";

const Intro = () => {
  const [showQuestionMark, setShowQuestionMark] = useState(true);
  const [text] = useTypewriter({
    words: [
      "What is this website",
      "Why be interested in this topic",
      "How do computers talk",
      "Let's explore the world together",
    ],
    deleteSpeed: 80,
    loop: 1,
    onLoopDone: () => setShowQuestionMark(false),
  });

  return (
    <>
      <h2 className="ml-0 sm:ml-20 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold md:pr-8 mb-8 md:mb-14 text-[hsl(var(--foreground))]">
        <span>{text}</span>
        <span className="text-[hsl(var(--primary))]">
          {showQuestionMark ? "?" : "!"}
        </span>
      </h2>
    </>
  );
};

export default Intro;
