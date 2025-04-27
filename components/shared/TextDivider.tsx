"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextDividerProps {
  text: string;
  direction?: "left" | "right";
  icon?: React.ReactNode;
}

const TextDivider = ({ text, direction = "right", icon }: TextDividerProps) => {
  const [repeatedText, setRepeatedText] = useState<React.ReactNode[]>([]);

  const sparklePositions = [20, 40, 60, 80, 90];

  useEffect(() => {
    const segment = [];

  
    for (let i = 0; i < 15; i++) {
      segment.push(
        <div key={i} className="inline-flex items-center gap-6">
          <span className="flex text-slate-50 items-center justify-center w-[80px]">
            {icon}
          </span>
          <span className="mx-2">•</span>
          <span>{text}</span>
          <span className="mx-2">•</span>
        </div>
      );
    }

    setRepeatedText(segment);
  }, [text, icon]);

  return (
    <div className="relative h-[100px] overflow-hidden flex items-center bg-black">
      {sparklePositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-xl h-6 bg-red-900 rounded-full blur-xl"
          animate={{
            x: ["-100%", "100%"],
            y: ["0%", "100%", "0%"],
            opacity: [0, 1, 0],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
          style={{
            left: `${position}%`,
            top: "50%",
          }}
        />
      ))}
      <motion.div
        className={cn(
          "whitespace-nowrap text-6xl py-4 text-slate-100  flex items-center gap-6"
        )}
        animate={{
          x: direction === "right" ? [0, -3000] : [-3000, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          x: direction === "right" ? "100%" : "-100%",
          letterSpacing: "0em",
          fontStretch: "200%",
          fontWeight: 1000,
          transform: "scaleY(35)",
        }}
      >
        {repeatedText}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-60 bg-gradient-to-r from-[#82181a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-60 bg-gradient-to-l from-[#82181a] to-transparent z-10" />
    </div>
  );
};

export default TextDivider;
