"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { logoStyles } from "@/constants/logo/logo-styles.constant";

const Hero = () => {
  return (
    <div className="relative">
      <div className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/48 z-10 w-full" />

        <motion.div
          initial={{ scale: 1.2, filter: "brightness(1)" }}
          animate={{ scale: 1, filter: "brightness(0.8)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/foto-1.jpg"
            alt="Gran Rah"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-start z-20 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Image
              src="/images/logo.png"
              alt="Gran Rah Logo"
              width={1000}
              height={1000}
              className="relative opacity-85 w-full filter z-10  transition-all duration-300 "
              style={logoStyles}
            />

            <div
              className="absolute inset-0 z-0 opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)",
                filter: "blur(20px)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
