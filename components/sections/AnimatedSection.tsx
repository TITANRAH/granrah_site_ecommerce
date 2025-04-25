// components/sections/AnimatedSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {d
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
  delay?: number;
  duration?: number;
}

export const AnimatedSection = ({
  children,
  direction = "left",
  className = "",
  delay = 0,
  duration = 1.2 
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [direction === "left" ? -100 : 100, 0] 
  );

  return (
    <motion.div
      ref={ref}
      className={`min-h-screen w-full ${className} m-auto`}
      style={{ opacity, x }}
    >
      <div className=" mx-auto">
        <motion.div
          initial={{ 
            opacity: 0, 
            x: direction === "left" ? -100 : 100 
          }}
          whileInView={{ 
            opacity: 1, 
            x: 0 
          }}
          transition={{ 
            duration, 
            ease: "easeOut",
            delay 
          }}
          
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};