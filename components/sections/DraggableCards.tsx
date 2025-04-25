"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Card {
  id: number;
  title: string;
  image: string;
}

const cards: Card[] = [
  { id: 1, title: "Música en vivo", image: "/images/music-1.jpg" },
  { id: 2, title: "Estudio de grabación", image: "/images/music-2.jpg" },
  { id: 3, title: "Producción musical", image: "/images/music-3.jpg" },
  { id: 4, title: "Clases de música", image: "/images/music-4.jpg" },
];

export const DraggableCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const moveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="relative h-[600px] w-2xl m-auto flex items-center justify-center">
      {/* Control Izquierdo */}
      <button
        onClick={moveLeft}
        className="absolute left-4  p-2 bg-white/10 backdrop-blur-sm rounded-full 
                 hover:bg-white/20 transition-all duration-300 text-white"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Control Derecho */}
      <button
        onClick={moveRight}
        className="absolute right-4  p-2 bg-white/10 backdrop-blur-sm rounded-full 
                 hover:bg-white/20 transition-all duration-300 text-white"
      >
        <ChevronRight size={40} />
      </button>

      <div className="relative w-[300px] h-[400px] perspective-[1000px]">
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
                  opacity: 1 - Math.abs(distance) * 0.2,
                  x: distance * 60,
                  y: Math.abs(distance) * 40,
                  rotateY: distance * -5,
                  scale: isActive ? 1 : 0.8 - Math.abs(distance) * 0.1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden 
                           hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: `brightness(${1 - Math.abs(distance) * 0.2})`,
                  }}
                >
                  <div className="relative w-full h-[70%]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-b from-black/50 to-black text-white">
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="text-sm opacity-75">
                      {isActive
                        ? "Tarjeta activa"
                        : "Click en las flechas para navegar"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
