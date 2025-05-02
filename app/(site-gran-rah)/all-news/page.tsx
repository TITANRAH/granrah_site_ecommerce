"use client";
import { getNews } from "@/actions/landing/get.news.action";
import {
  CategoryResponse,
  getCategories,
} from "@/actions/landing/get.categories.action";
import { NewResponse } from "@/interfaces/admin/news/new-response.interface";
import { PaginationMeta } from "@/interfaces/api-response/api-response.interface";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NewCardItem from "@/components/sections/landing/components/NewCardItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewsCardSkeleton from "@/components/sections/landing/components/skeletons/NewCardSkeleton";



function AllNewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;
  const limit = searchParams.get("limit") ? +searchParams.get("limit")! : 6;
  const category = searchParams.get("category") || undefined;

  const [news, setNews] = useState<NewResponse[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | undefined>();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener categorías al cargar la página
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Obtener noticias cuando cambian los filtros
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        console.log("Solicitando noticias con parámetros:", {
          page,
          limit,
          categoryId: category,
        });

        const response = await getNews({
          page,
          limit,
          categoryId: category,
        });

        console.log("Respuesta recibida:", response);
        setNews(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page, limit, category]);

  // Función para cambiar de página
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`/all-news?${params.toString()}`);
  };

  // Función para cambiar de categoría
  const handleCategoryChange = (categoryId: string) => {
    console.log("Cambiando a categoría:", categoryId);

    const params = new URLSearchParams(searchParams.toString());

    // Si selecciona "Todas", elimina el parámetro de categoría
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    // Reinicia a la página 1 cuando cambia el filtro
    params.set("page", "1");

    const newUrl = `/all-news?${params.toString()}`;
    console.log("Redirigiendo a:", newUrl);
    router.push(newUrl);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        Todas las Noticias
      </h1>

      {/* Filtros con select de categorías */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-red-500" />
          <span className="font-medium">Filtrar por:</span>
        </div>

        <div className="w-full md:w-64">
          <Select
            value={category || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent className=" bg-black/70">
              <SelectItem value="all" className="text-white">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="text-white">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: limit }, (_, i) => (
            <div
              key={i}
              className="transform hover:-translate-y-2 transition-transform duration-300"
            >
              <NewsCardSkeleton />
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">
            No hay noticias disponibles
          </h2>
          <p className="text-gray-500">
            Intenta con otros filtros o vuelve más tarde.
          </p>
        </div>
      ) : (
        <>
          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="transform hover:-translate-y-2 transition-transform duration-300"
              >
                <NewCardItem news={item} />
              </div>
            ))}
          </div>

          {/* Paginación */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center mt-12 items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page - 1)}
                disabled={!meta.hasPrevPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Números de página */}
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1
                )
                .map((p, i, arr) => (
                  <React.Fragment key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className="text-gray-500">...</span>
                    )}
                    <Button
                      variant={p === page ? "default" : "outline"}
                      onClick={() => handlePageChange(p)}
                      className={
                        p === page ? "bg-red-500 hover:bg-red-600" : ""
                      }
                    >
                      {p}
                    </Button>
                  </React.Fragment>
                ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page + 1)}
                disabled={!meta.hasNextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllNewsPage;
