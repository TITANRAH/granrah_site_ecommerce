"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextDivider from "@/components/shared/common/TextDivider";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS_PER_PAGE = 6;

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface GalleryVideo {
  id: number;
  thumbnail: string;
  title: string;
  url: string;
}

const galleryData = {
  images: [
    {
      id: 1,
      src: "/images/landing/foto-1.jpg",
      alt: "Concierto en vivo",
      category: "Conciertos",
    },
    {
      id: 2,
      src: "/images/landing/foto-1.jpg",

      alt: "Backstage",
      category: "Backstage",
    },
    {
      id: 3,
      src: "/images/landing/foto-1.jpg",

      alt: "Fans",
      category: "Fans",
    },
    {
      id: 4,
      src: "/images/landing/foto-1.jpg",

      alt: "Tour",
      category: "Tour",
    },
    {
      id: 5,
      src: "/images/landing/foto-1.jpg",

      alt: "Estudio",
      category: "Estudio",
    },
    {
      id: 6,
      src: "/images/landing/foto-1.jpg",

      alt: "Entrevistas",
      category: "Entrevistas",
    },
    {
      id: 7,
      src: "/images/landing/foto-1.jpg",

      alt: "Concierto en vivo 2",
      category: "Conciertos",
    },
    {
      id: 8,
      src: "/images/landing/foto-1.jpg",

      alt: "Backstage 2",
      category: "Backstage",
    },
    {
      id: 9,
      src: "/images/landing/foto-1.jpg",

      alt: "Fans 2",
      category: "Fans",
    },
  ] as GalleryImage[],
  videos: [
    {
      id: 1,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/P1nLFCLHCBw?si=xTf1YZ2WqRp02ftl",
    },
    {
      id: 2,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/3PAMo2w3j2I?si=b5bo-3R7UOQtrGqx",
    },
    {
      id: 3,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/Xbh7iZghq1Q?si=zY-RHyeun7qq1_A3",
    },
    {
      id: 4,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/vIE_hVCOMw8?si=QHtcnXxJ5L53TBdH",
    },
    {
      id: 5,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/U1e_W3qj2g4?si=DUNQdAn5O8rsxC7J",
    },
    {
      id: 6,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/ho4QC4FxL3k?si=FB0EAauaVArdi2MJ",
    },
    {
      id: 7,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/JLef7dTwwZY?si=AeJWJO5fIoQw3NzX",
    },
    {
      id: 8,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/CMQdK2qlREo?si=IlPrTPwnoCrtJGzO",
    },
    {
      id: 9,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/nyRMHiRagUA?si=aBJ-agFwJq4nGLdM",
    },
    {
      id: 10,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/GMn9iU2rlas?si=xKZkvh5EMFDceg7h",
    },
    {
      id: 11,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/GMn9iU2rlas?si=xKZkvh5EMFDceg7h",
    },
    {
      id: 12,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/Y6YCmMY9IOk?si=kBtx0nk7dFuhNC15",
    },
    {
      id: 13,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/mRlDVSuY4qc?si=KElLtWRWOms4agV3",
    },
    {
      id: 14,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/yhzpm43IbSI?si=v6wEv63cySFaIqJi",
    },
    {
      id: 15,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/BbZNIuCmv4I?si=j_-BXQm53oCK6b1X",
    },
    {
      id: 16,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/Y6YCmMY9IOk?si=kBtx0nk7dFuhNC15",
    },
    {
      id: 17,
      thumbnail: "/images/landing/foto-2.jpg",
      title: "Entrevista",
      url: "https://www.youtube.com/embed/4ymFeLrZNnM?si=OJyalvgem_nckRAt",
    },
  ] as GalleryVideo[],
};

export default function Gallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Obtener parámetros de la URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentTab =
    (searchParams.get("tab") as "images" | "videos") || "images";

  const totalPagesImages = Math.ceil(
    galleryData.images.length / ITEMS_PER_PAGE
  );
  const totalPagesVideos = Math.ceil(
    galleryData.videos.length / ITEMS_PER_PAGE
  );

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return currentTab === "images"
      ? galleryData.images.slice(startIndex, endIndex)
      : galleryData.videos.slice(startIndex, endIndex);
  };

  const handleTabChange = (value: string) => {
    const newTab = value as "images" | "videos";
    router.push(`?tab=${newTab}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    const totalPages =
      currentTab === "images" ? totalPagesImages : totalPagesVideos;
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`?tab=${currentTab}&page=${newPage}`);
    }
  };

  useEffect(() => {
    const totalPages =
      currentTab === "images" ? totalPagesImages : totalPagesVideos;
    if (currentPage > totalPages) {
      router.replace(`?tab=${currentTab}&page=1`);
    }
  }, [currentTab, currentPage, totalPagesImages, totalPagesVideos, router]);

  
  return (
    <section className="min-h-screen bg-background">
        <TextDivider text="Galería" />
      <div className="container mx-auto px-4 my-20">

        <Tabs
          defaultValue="images"
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-background/60 backdrop-blur-lg gap-4">
            <TabsTrigger
              value="images"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-white"
            >
              Imágenes
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-white"
            >
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-8">
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(getCurrentPageItems() as GalleryImage[]).map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="relative h-64 w-full rounded-xl overflow-hidden">
                    <Image
                      src={image.src || '/ruta/a/una/imagen-default.jpg'}
                      alt={image.src|| 'Imagen'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {totalPagesImages > 1 && currentTab === "images" && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-400"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: totalPagesImages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      className={`${
                        page === currentPage
                          ? "bg-red-500 text-white border-white hover:bg-red-600"
                          : "text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      } transition-all duration-300`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-400"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPagesImages}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="mt-8">
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(getCurrentPageItems() as GalleryVideo[]).map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedVideo(video.id)}
                >
                  <div className="relative h-64 w-full rounded-xl overflow-hidden">
                    <Image
                       src={video.thumbnail || '/ruta/a/una/imagen-default.jpg'}
                       alt={video.title || 'Imagen'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-sm font-medium">{video.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {totalPagesVideos > 1 && currentTab === "videos" && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-400"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: totalPagesVideos },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      className={`${
                        page === currentPage
                          ? "bg-red-500 text-white border-white hover:bg-red-600"
                          : "text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      } transition-all duration-300`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-400"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPagesVideos}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal de Imagen */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4">
                <Image
                  src={
                    galleryData.images.find((img) => img.id === selectedImage)
                      ?.src || ""
                  }
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Video */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={() => setSelectedVideo(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full max-w-4xl aspect-video">
                <iframe
                  src={
                    galleryData.videos.find((vid) => vid.id === selectedVideo)
                      ?.url
                  }
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
