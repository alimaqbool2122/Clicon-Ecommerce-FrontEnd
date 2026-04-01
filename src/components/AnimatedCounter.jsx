"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "motion/react";

export default function AnimatedCounter({ value, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  const numericValue = parseInt(value, 10) || 0;
  const hasLeadingZero = value.toString().startsWith("0");
  const count = useMotionValue(0);
  
  const rounded = useTransform(count, (latest) => {
    const raw = Math.round(latest);
    if (hasLeadingZero && raw < 10 && raw >= 0) {
      return `0${raw}`;
    }
    return raw;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // Expo out for a very stylish, premium feel
      });
      return () => controls.stop();
    }
  }, [count, numericValue, isInView]);

  return (
    <motion.span 
      ref={ref} 
      className={`inline-block tabular-nums ${className}`}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {rounded}
    </motion.span>
  );
}
