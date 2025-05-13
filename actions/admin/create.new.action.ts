"use server";

import { NewItemInterface } from "@/interfaces/admin/news/new-item.interface";
import { ApiResponse } from "@/interfaces/api-response/api-response.interface";
import prisma from "@/lib/prismadb";
import { New } from "@prisma/client";

export async function createNews(
  news: NewItemInterface
): Promise<ApiResponse<New>> {
  try {
    const created = await prisma.new.create({
      data: news,
    });
    return { success: true, data: created };
  } catch (error) {
    console.error("❌ Error en createNews:", error);
    return { success: false, error: (error as Error).message, data: null };
  }
}
