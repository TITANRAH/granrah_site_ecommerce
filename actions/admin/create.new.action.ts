"use server";

import { NewItemInterface } from "@/interfaces/admin/news/new-item.interface";
import prisma from "@/lib/prismadb";

export async function createNews(news: NewItemInterface) {
  try {
    const created = await prisma.new.create({
      data: news,
    });
    return { success: true, news: created };
  } catch (error) {
    console.error("❌ Error en createNews:", error);
    return { success: false, error: (error as Error).message };
  }
}
