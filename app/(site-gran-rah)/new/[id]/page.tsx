"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { newsDataJson } from "@/constants/landing/news/news.data-json.json";
import Link from "next/link";
import { use } from "react";
import TextDivider from "@/components/common/TextDivider";
import ShareButtons from "@/components/common/ShareButtons";

export default function New({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const currentNew = newsDataJson.find((news) => news.id === id);
  const otherNews = newsDataJson.filter((news) => news.id !== id);

  if (!currentNew) {
    return <div className="flex justify-center items-center h-[80vh] text-3xl">Noticia no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        <TextDivider text="Noticias" />

        <div className="grid container grid-cols-1 lg:grid-cols-3 gap-8 mx-auto ">
          {/* Columna Principal (2/3) */}
          <div className="lg:col-span-2">
            <Link
              href="/#news"
              className="mb-8 px-4 py-2 w-24 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
            <div className="bg-background/95 backdrop-blur-lg rounded-2xl overflow-hidden border border-red-500/20">
              <div className="relative h-[400px] w-full">
                <Image
                  src={currentNew.image}
                  alt={currentNew.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full border border-red-400/30">
                    {currentNew.category}
                  </span>
                  <span className="text-gray-400">
                    {new Date(currentNew.date).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-red-500 mb-6">
                  {currentNew.title}
                  <ShareButtons title={currentNew.title} />
                </h1>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Lateral (1/3) */}
          <div className="lg:col-span-1 mt-18 ">
            <div className="sticky top-23">
              <div className="bg-background/95 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20">
                <h2 className="text-2xl font-bold text-red-500 mb-6">
                  Otras Noticias
                </h2>
                <div className="space-y-6">
                  {otherNews.map((news) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <h3 className="text-lg font-medium text-red-500 group-hover:text-red-400 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {news.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
