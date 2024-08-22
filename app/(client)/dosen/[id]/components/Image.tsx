import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  alt: string;
}
const ImageComponent: React.FC<Props> = ({ src, alt }) => {
  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="rounded-full"
      />
    </div>
  );
};

export default ImageComponent;
