"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface AccordionItem {
  title: string;
  content: string;
  icon?: React.ReactNode;
  imageKey?: string;
}

interface ModernAccordionProps {
  items: AccordionItem[];
  onItemSelect?: (item: AccordionItem | null) => void;
}

export const ModernAccordion = ({
  items,
  onItemSelect,
}: ModernAccordionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    const newIndex = expandedIndex === index ? null : index;
    setExpandedIndex(newIndex);
    onItemSelect?.(newIndex !== null ? items[newIndex] : null);
  };

  return (
    <div className="md:w-full md:space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={false}
          className="rounded-2xl overflow-hidden bg-black/20 backdrop-blur-lg"
        >
          <motion.button
            className={`w-full p-6 flex items-center justify-between text-left ${
              expandedIndex === index ? "bg-slate-700/50" : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <span className="text-xl font-semibold text-slate-200">
                {item.title}
              </span>
            </div>
            <motion.div
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-slate-400"
            >
              <ChevronDown />
            </motion.div>
          </motion.button>

          <AnimatePresence initial={false}>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                    opacity: {
                      duration: 0.25,
                      delay: 0.15,
                    },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 0.25,
                    },
                  },
                }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-slate-300 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
