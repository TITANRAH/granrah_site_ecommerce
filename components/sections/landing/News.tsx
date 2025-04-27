import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const newsData = [
  {
    title: "¡Nuevo Álbum Disponible!",
    image: "/news/album.jpg",
    description:
      "Gran Rah lanza su esperado álbum con colaboraciones internacionales y sonidos innovadores. ¡Escúchalo ya en todas las plataformas!",
  },
  {
    title: "Gira Mundial 2024",
    image: "/news/tour.jpg",
    description:
      "La gira mundial de Gran Rah comienza en marzo. Consulta las fechas y ciudades para no perderte el show en vivo.",
  },
  {
    title: "Premio a Mejor Artista Urbano",
    image: "/news/award.jpg",
    description:
      "Gran Rah recibe el premio a Mejor Artista Urbano del año. Un reconocimiento a su trayectoria y dedicación.",
  },
  {
    title: "Nuevo Videoclip: 'Luz y Sombra'",
    image: "/news/videoclip.jpg",
    description:
      "Ya puedes ver el nuevo videoclip de Gran Rah, una producción visual impactante y llena de energía.",
  },
];

export default function News() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = newsData.length;

  // Carrusel automático
  useEffect(() => {
    const nextSlide = (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + total) % total);
    };
    const timer = setTimeout(() => {
      nextSlide(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, total]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="relative bg-gradient-to-br from-yellow-900/30 via-black/80 to-yellow-800/20 rounded-2xl shadow-2xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 p-6 min-h-[320px]"
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.95 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <motion.img
              src={newsData[index].image}
              alt={newsData[index].title}
              className="w-full md:w-64 h-48 object-cover rounded-xl shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
            <div className="flex-1 flex flex-col justify-center">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2 drop-shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {newsData[index].title}
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-white/90 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {newsData[index].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Flechas */}
        <button
          onClick={() => {
            setDirection(-1);
            setIndex((prev) => (prev - 1 + total) % total);
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-yellow-500/80 text-yellow-300 hover:text-black rounded-full p-2 shadow-lg transition"
          aria-label="Anterior"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            setDirection(1);
            setIndex((prev) => (prev + 1 + total) % total);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-yellow-500/80 text-yellow-300 hover:text-black rounded-full p-2 shadow-lg transition"
          aria-label="Siguiente"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {newsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full border-2 ${
                i === index
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-black/40 border-yellow-200"
              } transition`}
              aria-label={`Ir a la noticia ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
