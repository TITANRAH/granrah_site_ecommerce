'use client'

import { AnimatedSection } from "@/components/sections/AnimatedSection";
import { DraggableCards } from "@/components/sections/DraggableCards";
import { MediaPlayer } from "@/components/sections/MediaPlayer";
import { ModernAccordion } from "@/components/ui/Accordion";
import Hero from "@/components/shared/Hero";
import TextDivider from "@/components/shared/TextDivider";
import { MicIcon, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { aboutItems } from "@/constants/about-me/about-me-item.constant";

const images = {
  default: "/images/foto-3.jpg",
  quien: "/images/foto-1.jpg",
  trayectoria: "/images/foto-2.jpg",
  logros: "/images/foto-4.jpg",
  estilo: "/images/foto-5.jpg",
};

interface AccordionItem {
  title: string;
  content: string;
  icon?: React.ReactNode;
  imageKey?: string;
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState(images.default);

  const handleAccordionChange = (item: AccordionItem | null) => {
    setCurrentImage(item?.imageKey ? images[item.imageKey] : images.default);
  };

  return (
    <main>
      <Hero />

      <TextDivider
        text="GRAN RAH • MÚSICA • ARTE • STORE • LETRAS"
        direction="right"
      />
      <section className="max-w-[1200px] flex justify-center items-center m-auto">
        <AnimatedSection>
          <div id="music" className="pt-10">
            <h2 className="text-4xl flex font-bold items-center gap-2 text-slate-400 mb-6 my-20">
              <MicIcon size={40} /> Música
            </h2>
            <div className="flex justify-center items-center m-auto">
              <DraggableCards />
              <MediaPlayer
                spotifyUrl="https://open.spotify.com/embed/artist/6JjrF0EnCW3Ylj9gj3FXWZ?utm_source=generator"
                youtubeUrl="https://youtube.com/embed/@granrah?si=JEy3KxGqQloFWB4k"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
      <TextDivider
        text="ABOUT ME • ABOUT ME  • ABOUT ME  • ABOUT ME  • ABOUT ME "
        direction="left"
      />
      <section className="max-w-[1200px] flex justify-center items-center m-auto">
        <AnimatedSection>
          <div id="about" className="pt-10">
            <h2 className="text-4xl flex font-bold items-center gap-2 text-slate-400 mb-6 my-20">
              <User2 size={40} /> Sobre mi
            </h2>
            <div className="flex flex-col gap-12">
              <div className="flex justify-center">
                <div className="relative w-[500px] h-[300px] overflow-hidden rounded-2xl">
                  <Image
                    src={currentImage}
                    alt="about"
                    fill
                    className="object-contain scale-150"
                  />
                </div>
              </div>
              <div className="max-w-3xl mx-auto w-full">
                <ModernAccordion
                  items={aboutItems}
                  onItemSelect={handleAccordionChange}
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
      <TextDivider
        text="OTRA SECCION • MÚSICA • ARTE • STORE • LETRAS"
        direction="right"
      />
    </main>
  );
}
