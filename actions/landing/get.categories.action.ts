"use server";

import { ApiResponse } from "@/interfaces/api-response/api-response.interface";
import prisma from "@/lib/prismadb";

export interface CategoryResponse {
  id: string;
  name: string;
  description: string | null;
}

export async function getCategories(): Promise<
  ApiResponse<CategoryResponse[]>
> {
  try {
    const categories = await prisma.newCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return {
      success: false,
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Error al obtener las categorías",
    };
  }
}
