import cn from "classnames";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={slug ? "" : `Cover image for ${title}`}
      className={cn("shadow-sm w-full", {
        "h-44 object-cover transition-transform duration-500 group-hover:scale-[1.025]":
          slug,
      })}
      width={400}
      height={192}
    />
  );
  return <div className="sm:mx-0">{slug ? image : image}</div>;
};

export default CoverImage;
