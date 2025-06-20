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
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "rounded-xl hover:shadow-lg transition-shadow duration-200 h-32 object-fill shadow-[0_4px_12px_hsl(var(--shadow))]":
          slug,
      })}
      width={400}
      height={192}
    />
  );
  return <div className="sm:mx-0">{slug ? image : image}</div>;
};

export default CoverImage;
