"use client";

import { AnimatedSection } from "@/components/sections/wrapper/AnimatedSection";
import { DraggableCards } from "@/components/sections/landing/DraggableCards";
import { MediaPlayer } from "@/components/sections/landing/MediaPlayer";
import { ModernAccordion, AccordionItem } from "@/components/ui/Accordion";
import Hero from "@/components/shared/landing/Hero";

import TextDivider from "@/components/shared/landing/TextDivider";
import { User2, Music, Headphones, Mail, Newspaper } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { aboutItems } from "@/constants/landing/about-me/about-me-item.constant";
import { images } from "@/constants/landing/about-me/images-to-about-me";
import { ContactForm } from "@/components/sections/landing/ContactForm";
import News from "@/components/sections/landing/News";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(images.default);
  const handleAccordionChange = (item: AccordionItem | null) => {
    setCurrentImage(
      item?.imageKey
        ? images[item.imageKey as keyof typeof images]
        : images.default
    );
  };

  return (
    <main>
      <Hero />

      <TextDivider
        text="SITIO OFICIAL GRAN RAH"
        direction="right"
        icon={<Headphones className="text-black" size={60} strokeWidth={2} />}
      />
      <div id="music" className="bg-[#0A0A0A] w-full h-20"></div>
      <TextDivider
        text="MÚSICA "
        direction="left"
        icon={
          <Music className="text-black font-bold" size={60} strokeWidth={2} />
        }
      />
      <section className="max-w-[1200px] flex justify-center items-center m-auto">
        <AnimatedSection>
          <div id="music" className="md:my-28 flex justify-center mr-24">
            <div className="flex flex-col md:flex-row justify-center items-center m-auto w-full">
              <DraggableCards />
              <MediaPlayer
                spotifyUrl="https://open.spotify.com/embed/artist/6JjrF0EnCW3Ylj9gj3FXWZ?utm_source=generator"
                youtubeUrl="https://youtube.com/embed/@granrah?si=JEy3KxGqQloFWB4k"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
      <div id="about" className="bg-[#0A0A0A] w-full h-20"></div>
      <TextDivider
        text="ABOUT ME"
        direction="right"
        icon={<User2 className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px] my-32 flex justify-center items-center m-auto">
        <AnimatedSection direction="right">
            <div className="flex flex-row ">
              <div className="flex justify-center ">
                <div className="relative w-[500px] h-[500px] overflow-hidden rounded-2xl">
                  <Image
                    src={currentImage}
                    alt="about"
                    fill
                    className="object-contain scale-150 "
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
        </AnimatedSection>
      </section>
      <div id="news" className="bg-[#0A0A0A] w-full h-20"></div>
      <TextDivider
        text="NEWS"
        direction="left"
        icon={<Newspaper className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px] p-20 flex justify-center items-center m-auto">
        <AnimatedSection direction="right">
          <div className="my-24 ">
            <News />
          </div>
        </AnimatedSection>
      </section>
      <div id="contact" className="bg-[#0A0A0A] w-full h-20"></div>

      <TextDivider
        text="CONTACTO"
        direction="right"
        icon={<Mail className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px] p-20 flex justify-center items-center m-auto">
        <ContactForm />
      </section>
    </main>
  );
}
