import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewResponse } from "@/interfaces/admin/news/new-response.interface";
import { ScrollArea } from "@/components/ui/scroll-area";

function ColumnRightNews({ relatedNews }: { relatedNews: NewResponse[] }) {
  return (
    <div className="lg:col-span-1 my-18 border border-red-500/20 rounded-2xl">
      <div className="sticky top-23">
        <div className="bg-background/95 backdrop-blur-lg rounded-2xl p-6 ">
          <h2 className="text-2xl font-bold text-red-500 mb-6">
            Otras Noticias
          </h2>
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="space-y-6">
              {relatedNews.map((news) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group cursor-pointer border border-white/20 rounded-lg px-5 "
                >
                  <Link
                    href={`/new/${news.id}`}
                    className=" rounded-lg p-2 transition-colors"
                  >
                    <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={news.srcImages[0] || ""}
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
                      {news.textPrev}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default ColumnRightNews;
