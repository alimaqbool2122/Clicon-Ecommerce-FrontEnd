"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/constants/assets";
import Image from "next/image";

const BackTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        className={`fixed right-7.5 bottom-8 rounded-[50%] flex items-center justify-center size-12 cursor-pointer shadow-[inset_0_0_0_2px_rgba(0,0,0,.1)] bg-white z-20 duration-500 ease-linear
                ${visible ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"}
            `}
      >
        <Image
          src={assets.ArrowCircleUp}
          alt="ArrowCircleUp"
          width={28}
          height={28}
        />
      </div>
    </>
  );
};

export default BackTop;
