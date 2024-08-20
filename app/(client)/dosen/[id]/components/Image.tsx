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
        width={200}
        height={200}
        className="rounded-full mb-4"
      />
    </div>
  );
};

export default ImageComponent;
