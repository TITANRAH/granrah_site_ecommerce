import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

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
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${bebasNeue.className} bg-white dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen bg-background pt-20">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
