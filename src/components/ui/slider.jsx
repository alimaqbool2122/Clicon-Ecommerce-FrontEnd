"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider as SliderPrimitive } from "radix-ui";

function Slider({ className, children, ...props }) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex h-4 w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[2.4px] w-full overflow-hidden rounded-full bg-[#E4E7E9]">
        <SliderPrimitive.Range className="absolute h-full bg-[#FA8232]" />
      </SliderPrimitive.Track>
      {children}
    </SliderPrimitive.Root>
  );
}

function SliderThumb({ className, ...props }) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "box-content block size-4 shrink-0 cursor-pointer rounded-full border-[2.4px] border-[#FA8232] bg-white shadow-xs shadow-black/5 outline-hidden focus:outline-hidden",
        className
      )}
      {...props}
    />
  );
}

export { Slider, SliderThumb };
