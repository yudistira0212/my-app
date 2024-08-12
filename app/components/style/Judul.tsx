import React from "react";

interface JudulProps {
  text: string;
  level?: number;
  className?: string;
}

const Judul: React.FC<JudulProps> = ({ text, level, className }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className={`text-2xl font-bold mb-4 ${className}`}>
      {text}
    </HeadingTag>
  );
};

export default Judul;
