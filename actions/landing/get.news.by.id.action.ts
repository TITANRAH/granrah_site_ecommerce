"use server";

import { NewResponse } from "@/interfaces/admin/news/new-response.interface";
import { ApiResponse } from "@/interfaces/api-response/api-response.interface";
import prisma from "@/lib/prismadb";

interface NewsWithRelatedResponse {
  currentNews: NewResponse;
  relatedNews: NewResponse[];
}

export async function getNewsById(
  id: string
): Promise<ApiResponse<NewsWithRelatedResponse>> {
  try {
    if (!prisma) {
      throw new Error("La conexión a la base de datos no está disponible");
    }

    const [currentNews, relatedNews] = await Promise.all([
      prisma.new.findUnique({
        where: { id },
        include: { category: true },
      }),
      prisma.new.findMany({
        where: {
          NOT: { id },
        },
        include: { category: true },
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    if (!currentNews) {
      return {
        success: false,
        data: {} as NewsWithRelatedResponse,
        error: "Noticia no encontrada",
      };
    }

    return {
      success: true,
      data: {
        currentNews: currentNews as NewResponse,
        relatedNews: relatedNews as NewResponse[],
      },
    };
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    return {
      success: false,
      data: {} as NewsWithRelatedResponse,
      error:
        error instanceof Error ? error.message : "Error al obtener la noticia",
    };
  }
}
