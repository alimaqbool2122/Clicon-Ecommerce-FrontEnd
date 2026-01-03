"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "../svg/Icons";

export default function Button({
  text = "Shop now",
  link = "#",
  bgColor = "#FA8232",
  textColor = "#fff",
  borderColor = "#FA8232",
  py = "py-3.5",
  px = "px-6",
  fontSize = "text-[14px]",
  rounded = "rounded-[3px]",
  hoverBgColor = "transparent",
  hoverTextColor = "#212529",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href={link}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? hoverBgColor : bgColor,
        color: isHover ? hoverTextColor : textColor,
        borderColor: borderColor,
      }}
      className={`
                inline-flex items-center gap-3 border-2 
                ${py} ${px} ${fontSize} uppercase font-bold ${rounded}
                duration-500 ease-linear
            `}
    >
      {text}
      <ArrowRight />
    </Link>
  );
}
