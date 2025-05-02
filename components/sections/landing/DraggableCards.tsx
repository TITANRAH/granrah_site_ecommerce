"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DraggableCardItem from "./components/DraggableCardItem";
import { cards } from "@/constants/landing/draggable-card/draggable-card-items";

export const DraggableCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const moveLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const moveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-[420px] w-full max-w-xs sm:max-w-sm md:max-w-3xl mx-auto flex flex-col items-center justify-center">
      <div className="relative w-full aspect-square sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] perspective-[1000px] flex items-center">
        {/* Controles laterales en escritorio */}
        <button
          onClick={moveLeft}
          className="hidden sm:flex absolute left-4 z-50 md:-left-10 p-2 bg-black rounded-full transition-all duration-300 text-white top-1/2 -translate-y-1/2"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={moveRight}
          className="hidden sm:flex absolute right-4 md:-right-10 p-2 bg-black backdrop-blur-sm rounded-full  transition-all duration-300 text-white z-50 top-1/2 -translate-y-1/2"
        >
          <ChevronRight size={40} />
        </button>
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            const distance =
              (index - currentIndex + cards.length) % cards.length;
            const isActive = distance === 0;

            return (
              <motion.div
                key={card.id}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  zIndex: cards.length - Math.abs(distance),
                }}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  rotateY: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1 - Math.abs(distance) * 0.1,
                  x: isMobile ? 0 : distance * 75,
                  y: Math.abs(distance) * 5,
                  rotateY: distance * -5,
                  scale: isActive ? 1 : 0.9 - Math.abs(distance) * 0.2,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <DraggableCardItem card={card} distance={distance} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {/* Controles abajo en móvil */}
      <div className="flex justify-center gap-8 mt-2 sm:hidden">
        <button
          onClick={moveLeft}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white z-10"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={moveRight}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white z-10"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};
