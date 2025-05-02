"use client";

import { use, useEffect, useState } from "react";
import TextDivider from "@/components/common/TextDivider";
import { getNewsById } from "@/actions/landing/get.news.by.id.action";
import { NewResponse } from "@/interfaces/admin/news/new-response.interface";
import NewDetailSkeleton from "@/components/sections/landing/components/skeletons/NewDetailSkeleton";
import ColumnRightNews from "@/components/sections/landing/components/ColumnRightNews";
import ColimnLeftNews from "@/components/sections/landing/components/ColimnLeftNews";

export default function New({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [currentNew, setCurrentNew] = useState<NewResponse | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getNewsById(id);
        if (response.success) {
          setCurrentNew(response.data.currentNews);
          setRelatedNews(response.data.relatedNews);
        }
      } catch (error) {
        console.error("Error al cargar la noticia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <NewDetailSkeleton />;
  }

  if (!currentNew) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-3xl">
        Noticia no encontrada
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        <TextDivider text="Noticias" />

        <div className="grid container grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
          {/* Columna Principal (2/3) */}
          <ColimnLeftNews currentNew={currentNew} />

          {/* Columna Lateral (1/3) */}
          <ColumnRightNews relatedNews={relatedNews} />
        </div>
      </div>
    </div>
  );
}
