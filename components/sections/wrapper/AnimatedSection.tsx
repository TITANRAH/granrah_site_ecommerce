// components/sections/AnimatedSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

interface AnimatedSectionProps {
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
  duration = 1.2,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.2],
    [direction === "left" ? -100 : 100, 0]
  );

  if (isMobile) {
    return (
      <div ref={ref} className={`min-h-[78vh] w-full ${className} m-auto`}>
        <div className="mx-auto">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`w-full ${className}`}
      style={{ opacity, x }}
    >
      <div className="mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            x: direction === "left" ? -100 : 100,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration,
            ease: "easeOut",
            delay,
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};
