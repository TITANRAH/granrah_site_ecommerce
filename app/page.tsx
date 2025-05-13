import { AnimatedSection } from "@/components/common/AnimatedSection";
import { DraggableCards } from "@/components/sections/landing/DraggableCards";
import { MediaPlayer } from "@/components/sections/landing/MediaPlayer";
import { ModernAccordion } from "@/components/ui/Accordion";
import Hero from "@/components/sections/landing/Hero";
import { DinoGame } from "@/components/games/DinoGame";
import Image from "next/image";

import TextDivider from "@/components/common/TextDivider";
import {
  User2,
  Music,
  Headphones,
  Mail,
  Newspaper,
  ChevronLeft,
  Gamepad2,
} from "lucide-react";

import { aboutItems } from "@/constants/landing/about-me/about-me-item.constant";
import { ContactForm } from "@/components/sections/landing/ContactForm";
import FeaturedNews from "@/components/sections/landing/FeaturedNews";
import { getNews } from "@/actions/landing/get.news.action";
import Link from "next/link";
import { auth } from "@/utils/auth";

export default async function Home() {
  const news = await getNews({ page: 1, limit: 1 });

  const session = await auth();

  const featuredNews = news.data?.[0];

  return (
    <main>
      <Hero />

      <TextDivider
        text="SITIO OFICIAL GRAN RAH"
        direction="right"
        icon={<Headphones className="text-black" size={60} strokeWidth={2} />}
      />
      <div id="music" className=" w-full h-20"></div>
      <TextDivider
        text="MÚSICA "
        direction="left"
        icon={
          <Music className="text-black font-bold" size={60} strokeWidth={2} />
        }
      />
      <section className="max-w-[1200px] flex justify-center dark:bg-green items-center m-auto">
        <AnimatedSection>
          <div
            id="music"
            className="mx-10 md:my-28 flex justify-center md:mr-28 light:bg-green "
          >
            <div className="flex flex-col md:flex-row justify-center items-center m-auto w-full">
              <DraggableCards />
              <MediaPlayer
                spotifyUrl="https://open.spotify.com/embed/artist/6JjrF0EnCW3Ylj9gj3FXWZ?utm_source=generator"
                youtubeUrl="https://www.youtube.com/embed/yvS-tOdqEAk?si=uDJBbgzRd4HODa0U"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
      <div id="about" className=" w-full h-20"></div>
      <TextDivider
        text="ABOUT ME"
        direction="right"
        icon={<User2 className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px] my-32 flex justify-center items-center m-auto">
        <AnimatedSection direction="right">
          <div className="flex md:flex-row flex-col gap-10 ">
            <div className="flex justify-center items-center ">
              <div className="relative w-[500px] h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src="/images/landing/foto-3.JPG"
                  alt="Granrah"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-[350px] md:max-w-3xl mx-auto md:w-full">
              <ModernAccordion items={aboutItems} />
            </div>
          </div>
        </AnimatedSection>
      </section>
      <div id="news" className=" w-full h-20"></div>
      <TextDivider
        text="NEWS"
        direction="left"
        icon={<Newspaper className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px]  mt-5 flex justify-center items-center m-auto">
        <div className="">
          <div className="flex flex-col">
            {featuredNews && <FeaturedNews newsItem={featuredNews!} />}

            <Link
              href="/all-news"
              className="w-[250px] px-4 py-2 mt-2  text-2xl  rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Ver todas las noticias
            </Link>
          </div>
          {!featuredNews && (
            <main className="flex justify-center items-center h-[50vh] text-3xl">
              <p>Sin noticias disponibles</p>
            </main>
          )}
        </div>
      </section>

      <div id="contact" className=" w-full h-20"></div>
      <TextDivider
        text="CONTACTO"
        direction="right"
        icon={<Mail className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px] my-5  flex justify-center items-center m-auto">
        <ContactForm />
      </section>

      <div id="game" className="w-full h-20"></div>
      <TextDivider
        text="¡JUEGA Y GANA!"
        direction="right"
        icon={<Gamepad2 className="text-black" size={60} strokeWidth={2} />}
      />
      <section className="max-w-[1200px] my-5 flex justify-center items-center m-auto">
        <DinoGame session={session} />
      </section>
    </main>
  );
}
