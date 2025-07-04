"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, Play } from "lucide-react";
import TextDivider from "@/components/common/TextDivider";
import { NewResponse } from "@/interfaces/admin/news/new-response.interface";

interface FeaturedNewsProps {
  newsItem: NewResponse | null;
}

export default function FeaturedNews({ newsItem }: FeaturedNewsProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!newsItem) {
    return null;
  }

  return (
    <section className="min-h-[55vh] md:max-w-6xl">
      <div className="container mx-auto">
        <div className="flex justify-center items-center rounded-2xl">
          <TextDivider
            text="Noticia Destacada"
            className="rounded-xl"
            icon={
              <Newspaper className="text-black" size={60} strokeWidth={2} />
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Link href={`/new/${newsItem.id}`}>
            <div
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Contenedor de imagen/video */}
              <div className="relative h-[55vh] w-full">
                {newsItem.urlVideos.length > 0 ? (
                  <>
                    <Image
                      src={newsItem.srcImages[0] || ""}
                      alt={newsItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={newsItem.srcImages[0] || ""}
                      alt={newsItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </>
                )}
              </div>

              {/* Contenido superpuesto */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full border border-red-400/30">
                    {newsItem.category.name}
                  </span>
                  <span className="text-gray-300">
                    {new Date(newsItem.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-red-500 transition-colors duration-300">
                  {newsItem.title}
                </h2>
                <p className="text-lg text-gray-300 line-clamp-3">
                  {newsItem.noticeTextP1}
                </p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -20,
                  }}
                  className="mt-6 inline-flex items-center text-red-500 font-medium"
                >
                  Leer más
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
