"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative">
      <div className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/65 z-10 w-full" />

        <motion.div
          initial={{ scale: 1.2, filter: "brightness(1)" }}
          animate={{ scale: 1, filter: "brightness(0.8)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/foto-9.jpeg"
            alt="Gran Rah"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
