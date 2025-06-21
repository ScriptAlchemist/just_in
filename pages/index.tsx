import Head from "next/head";
import Image from "next/image";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import MoreStories from "../components/more-stories";
import { getAllPosts } from "../lib/api";
import JustinImg from "../public/assets/blog/authors/skydiver_justin.jpeg";
//import { CMS_NAME } from '../lib/constants'
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../components/ui/3dCard";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Head>
        <title>{`Some(Scripting) by Justin Bender!`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        <CardContainer className="my-0 md:my-5">
          <CardBody className="relative group/card w-full h-auto">
            <CardItem translateZ="20" className="flex flex-row pb-4">
              <Image
                src={JustinImg}
                style={{ objectFit: "contain" }}
                alt="Picture of Justin Bender"
                placeholder="blur"
                className="rounded-2xl hidden md:block h-52 w-fit lg:ml-20"
              />
              <div className="flex flex-col w-5/6 md:w-3/4 mx-auto text-[hsl(var(--foreground))] dark:text-[hsl(var(--card-foreground))]">
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
                  All of the posts will be listed using a timestamp.
                  With the most recent one at the top. If you have any
                  questions, you can message me.
                </p>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
