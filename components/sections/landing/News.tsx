"use client";
import { motion } from "framer-motion";

import NewCardItem from "@/components/sections/landing/components/NewCardItem";
import { NewResponse } from "@/interfaces/admin/news/new-response.interface";
import {  ChevronLeft } from "lucide-react";
import Link from "next/link";

interface NewsProps {
  news: NewResponse[];
}

export default function News({ news }: NewsProps) {
  return (
    <section className="w-full h-full md:max-w-6xl mx-auto px-4 ">
      <div className="flex justify-end w-[200px]">

       <Link
        href="/all-news"
        className="w-full mb-8 px-4 py-2  rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 flex items-center"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Ver todas las noticias
      </Link>
      </div>
      <div className="flex items-center justify-between mb-12">

     
        <h2 className="text-4xl font-bold text-red-500">Últimas Noticias</h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-red-500/50 to-transparent ml-4" />
      </div>
      <div className="grid gap-8">
        {news.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NewCardItem news={news} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
