import type { Metadata } from "next";
import {  Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/common/Navbar";
import Footer from "@/components/shared/common/Footer";

// const teko = Teko({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-teko",
// });

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

// const rubik = Rubik({
//   subsets: ["latin"],
//   variable: "--font-rubik",
// });

export const metadata: Metadata = {
  title: "Gran Rah | Música & Arte",
  description: "Sitio oficial de Gran Rah - Música, arte y tienda oficial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable}`}
      >
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
