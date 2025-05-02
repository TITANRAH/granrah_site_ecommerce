"use server";

import { NewResponse } from "@/interfaces/admin/news/new-response.interface";
import {
  ApiResponse,
  PaginationMeta,
} from "@/interfaces/api-response/api-response.interface";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

interface NewsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
}

export async function getNews(
  params?: NewsParams
): Promise<ApiResponse<NewResponse[]>> {
  try {
    // Valores por defecto para paginación
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    // Validar que la conexión a la base de datos esté disponible
    if (!prisma) {
      throw new Error("La conexión a la base de datos no está disponible");
    }

    // Construir filtros opcionales
    const where: Prisma.NewWhereInput = {};

    if (params?.categoryId) {
      where.categoryId = params.categoryId;
    }

    // Construir query base con where incluido
    const queryOptions: Prisma.NewFindManyArgs = {
      where, // Aplicar filtros
      orderBy: {
        createdAt: "asc",
      },
      include: {
        category: true,
      },
      take: limit,
      skip: skip,
    };

    // Obtener total de registros para metadatos de paginación
    const totalNews = await prisma.new.count({
      where,
    });

    console.log("Total noticias:", totalNews, "Filtros:", where);

    // Ejecutar la consulta
    const news = await prisma.new.findMany(queryOptions);

    // Validar los datos obtenidos
    if (!news || !Array.isArray(news)) {
      throw new Error("Formato de datos inválido");
    }

    // Añadir metadatos de paginación
    const meta: PaginationMeta = {
      total: totalNews,
      page,
      limit,
      totalPages: Math.ceil(totalNews / limit),
      hasNextPage: page < Math.ceil(totalNews / limit),
      hasPrevPage: page > 1,
    };

    // Aquí ocurre un hack de tipos forzando la asignación
    // Se asume que el campo category está presente gracias a include
    return {
      success: true,
      data: news as unknown as NewResponse[],
      meta,
    };
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    return {
      success: false,
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Error al obtener las noticias",
    };
  }
}
