import { z } from "zod";

export const discoSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  imageUrl: z.string().min(1, "La URL de la imagen es requerida"),
  featurings: z.array(z.string()).min(1, "Debe haber al menos un artista"),
  descriptionP1: z.string().min(1, "El primer párrafo es requerido"),
  descriptionP2: z.string().nullable(),
  descriptionP3: z.string().nullable(),
  descriptionP4: z.string().nullable(),
});
