'use server'

import prisma  from "@/lib/prismadb";
import { auth } from "@/utils/auth";

interface CreateDiscountCodeParams {
  score: number;
}

export const createDiscountCode = async ({
  score,
}: CreateDiscountCodeParams) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("No autorizado");
    }

    // Generar un código de descuento único
    const discountCode = `DINO${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Guardar el código de descuento en la base de datos
    const newDiscountCode = await prisma.discountCode.create({
      data: {
        code: discountCode,
        userId: session.user.id,
        score: score,
        isUsed: false,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expira en 7 días
      },
    });

    return {
      success: true,
      data: newDiscountCode,
    }
  } catch (error) {
    console.error("Error al generar código de descuento:", error);
    return {
      success: false,
      error: "Error al generar código de descuento",
    };
  }
};
