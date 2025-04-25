"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextDividerProps {
  text: string;
  direction?: "left" | "right";
}

const TextDivider = ({ text, direction = "right" }: TextDividerProps) => {
  const [repeatedText, setRepeatedText] = useState("");

  const sparklePositions = [20, 40, 60, 80, 90];

  useEffect(() => {
    setRepeatedText((text + " • ").repeat(10));
  }, [text]);

  return (
    <div className="relative h-[99px]  overflow-hidden  flex items-center bg-slate-50 ">
      s{" "}
      {sparklePositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 bg-white rounded-full blur-xl"
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
      {/* Texto en movimiento */}
      <motion.div
        className={cn("whitespace-nowrap text-6xl py-4  text-black")}
        animate={{
          x: direction === "right" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          x: direction === "right" ? "100%" : "-100%",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          letterSpacing: "0em",
          fontStretch: "200%",
          fontWeight: 1000,
          transform: "scaleY(35)",
          WebkitTextStroke: "2px black",
        }}
      >
        {repeatedText}
      </motion.div>
      {/* Líneas decorativas */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f9ff] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f9ff] to-transparent z-10" />
    </div>
  );
};

export default TextDivider;
