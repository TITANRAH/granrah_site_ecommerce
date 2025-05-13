"use server";

import { DiscoItemInterface } from "@/interfaces/admin/discos/disco.interface";
import { ApiResponse } from "@/interfaces/api-response/api-response.interface";
import prisma from "@/lib/prismadb";
import { Disco } from "@prisma/client";

export async function createDisco(
  disco: DiscoItemInterface
): Promise<ApiResponse<Disco>> {
  try {
    const created = await prisma.disco.create({
      data: disco,
    });
    return { success: true, data: created };
  } catch (error) {
    console.error("❌ Error en createDisco:", error);
    return { success: false, error: (error as Error).message, data: null };
  }
}
