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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <motion.nav
      initial="initial"
      animate="animate"
      className="fixed w-full top-2 flex m-auto justify-center md:left-1/2 md:-translate-x-1/2 md:min-w-4xl mx-auto z-50"
    >
      <div className="w-full md:grid md:grid-cols-12 md:gap-10 mx-auto flex justify-center m-auto">
        <div className="hidden col-span-3 md:flex items-center justify-center gap-4">
          <div>Bienvenido Sergio</div>
          <Button variant="outline" className="rounded-full">
            <User size={20} /> iniciar sesión
          </Button>
        </div>

        <nav className="mx-10 md:mx-0 col-span-7 w-full rounded-full backdrop-blur-lg bg-background/60 border border-gray-200/20 shadow-lg">
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

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative mr-3 w-12 h-12 rounded-full border border-gray-200/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300"
                  >
                    <Menu className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-lg border-l border-red-500/20"
                >
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-red-500">
                      Menú
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 mt-8 mx-5">
                    {links.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        }}
                      >
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="text-lg font-medium hover:text-red-500 transition-all duration-300 flex items-center group w-full text-left"
                        >
                          <span className="relative">
                            {link.label}
                            <motion.div
                              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500"
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                        </button>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4 border-t border-gray-200/20"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                      >
                        <User size={20} className="mr-2" /> Iniciar sesión
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-center gap-6 pt-4"
                    >
                      <ShoppingCart
                        size={24}
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/cart");
                        }}
                        className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110"
                      />
                      <MessageCircle
                        size={24}
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/#contact");
                        }}
                        className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110"
                      />
                    </motion.div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        <div className="hidden md:flex col-span-2 items-center gap-10 justify-center">
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
