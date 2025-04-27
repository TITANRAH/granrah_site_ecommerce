import { z } from "zod";

export const conctacFormSchema = z.object({
    nombre: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    }),
    email: z.string().email({
      message: "Por favor, introduce un email válido.",
    }),
    asunto: z.string().min(5, {
      message: "El asunto debe tener al menos 5 caracteres.",
    }),
    mensaje: z.string().min(10, {
      message: "El mensaje debe tener al menos 10 caracteres.",
    }),
  });
  