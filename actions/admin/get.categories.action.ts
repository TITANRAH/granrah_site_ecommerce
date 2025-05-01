"use server";

import { NewCategoryInterface } from "@/interfaces/admin/news/new-category.interface";
import { ApiResponse } from "@/interfaces/responses/api.response";
import prisma from "@/lib/prismadb";

export async function getCategories(): Promise<ApiResponse<NewCategoryInterface[]>> {
  try {
    const categories = await prisma.newCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: categories || [],
    };
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return {
      success: false,
      data: [],
      error: "Error al obtener las categorías",
    };
  }
}
