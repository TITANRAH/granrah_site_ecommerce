import { motion } from "framer-motion";

import NewCardItem from "@/components/sections-components/landing/new-card/NewCardItem";
import { newsData } from "@/constants/landing/news/news.data.json";

export default function News() {
  return (
    <section className="w-full h-full md:max-w-6xl mx-auto px-4 ">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-bold text-red-500">Últimas Noticias</h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-red-500/50 to-transparent ml-4" />
      </div>
      <div className="grid gap-8">
        {newsData.map((news, index) => (
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
