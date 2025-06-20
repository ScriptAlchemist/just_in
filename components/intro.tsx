//import { CMS_NAME } from '../lib/constants'
import Image from "next/image";
import { useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import JustinImg from "../public/assets/blog/authors/skydiver_justin.jpeg";
import { CardBody, CardContainer, CardItem } from "./ui/3dCard";

const Intro = () => {
  const [showQuestionMark, setShowQuestionMark] = useState(true);
  const [text] = useTypewriter({
    words: [
      "What did I write about",
      "What is interesting today",
      "What is on my mind",
      "Checkout my newest post",
    ],
    deleteSpeed: 80,
    loop: 1,
    onLoopDone: () => setShowQuestionMark(false),
  });

  return (
    <>
      <CardContainer className="my-0 md:my-10">
        <CardBody className="relative group/card w-full h-auto">
          <CardItem translateZ="20" className="flex flex-row py-4">
            <Image
              src={JustinImg}
              style={{ objectFit: "contain" }}
              alt="Picture of Justin Bender"
              placeholder="blur"
              className="rounded-2xl hidden md:block h-52 w-fit lg:ml-20"
            />
            <div className="flex flex-col mt-5 w-5/6 md:w-3/4 mx-auto text-[hsl(var(--foreground))] dark:text-[hsl(var(--card-foreground))]">
              <p className="pb-5 font-semibold">
                <span className="text-[hsl(var(--destructive))] text-2xl">
                  Hello
                </span>
                , my name is{" "}
                <span className="text-[hsl(var(--primary))] text-2xl">
                  Justin
                </span>
              </p>
              <p className="text-sm sm:text-lg pb-5 font-thin text-[hsl(var(--muted-foreground))]">
                These opinions are my own. Not for any employer that I
                currently work.
              </p>
              <p className="text-sm sm:text-lg font-semibold text-[hsl(var(--foreground))]">
                All of the posts will be listed below using a timestamp.
                With the most recent one at the top. If you have any
                questions, you can message me.
              </p>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
      <h2 className="ml-0 sm:ml-20 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:pr-8 mb-8 md:mb-14 text-[hsl(var(--primary))]">
        <span>{text}</span>
        <span className="text-[hsl(var(--primary))]">
          {showQuestionMark ? "?" : "!"}
        </span>
      </h2>
    </>
  );
};

export default Intro;
