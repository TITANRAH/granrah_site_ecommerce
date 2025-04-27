"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Sun,
  Moon,
  ShoppingCart,
  User,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { links } from "@/constants/landing/menu/menu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  const linkVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.nav
      initial="initial"
      animate="animate"
      className="fixed w-full top-2 flex m-auto justify-center md:left-1/2 md:-translate-x-1/2 md:min-w-4xl mx-auto z-50"
    >
      <div className="w-full grid grid-cols-10 gap-10 mx-auto">
        <div className="col-span-2 flex items-center justify-center gap-4">
          <div>Hola Bienvenido</div>
          <Button variant="outline" className="rounded-full">
            <User size={20} /> iniciar sesión
          </Button>
        </div>

        <nav className="col-span-6 rounded-full backdrop-blur-lg bg-background/60 border border-gray-200/20 shadow-lg">
          <div className="flex h-16 items-center justify-between">
            {/* Switch Container */}
            <div
              className="relative w-[200px] h-[65px] cursor-pointer flex items-center"
              onClick={() => setIsDark(!isDark)}
            >
              {/* Sun/Moon Icons */}
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <motion.div
                  animate={{
                    opacity: isDark ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Sun className="w-8 h-8 text-gray-400" />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: isDark ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Moon className="w-8 h-8 text-gray-400" />
                </motion.div>
              </div>

              {/* Sliding Logo */}
              <motion.div
                className="absolute w-[65px] h-[65px]"
                animate={{
                  x: isDark ? 132 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Gran Rah Logo"
                  fill
                  className="object-cover"
                  style={{
                    filter: `
                      brightness(200%)
                      contrast(200%)
                      drop-shadow(2px 2px 2px rgba(0,0,0,0.2))
                    `,
                  }}
                />
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-6 mr-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium relative group px-3 py-2"
                  >
                    <span className="relative z-10 hover:text-gray-400">
                      {link.label}
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:hidden"
            >
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full border border-gray-200/20 bg-background/60 backdrop-blur-sm hover:bg-background/80"
              >
                <Menu className="h-6 w-6" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </Button>
            </motion.div>
          </div>
        </nav>

        <div className="col-span-2 flex items-center gap-10 justify-center">
          <ShoppingCart
            size={40}
            onClick={() => router.push("/cart")}
            className="cursor-pointer"
          />
          <MessageCircle
            size={40}
            onClick={() => router.push("/#contact")}
            className="cursor-pointer"
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
