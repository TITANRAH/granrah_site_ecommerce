import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  textPrev: z.string().min(1, "El texto previo es requerido"),
  srcImages: z.array(z.string()),
  urlVideos: z.array(z.string()),
  noticeTextP1: z.string().min(1, "El primer párrafo es requerido"),
  noticeTextP2: z.string().optional(),
  noticeTextP3: z.string().optional(),
  noticeTextP4: z.string().optional(),
  isFeatured: z.boolean(),
  categoryId: z.string().min(1, "La categoría es requerida"),
});
