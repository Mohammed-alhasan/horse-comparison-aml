import { z } from "zod";

export const horseFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  height: z.string().optional(),
  weight: z.string().optional(),
  favoriteFood: z.string().optional(),
});

export type HorseFormValues = z.infer<typeof horseFormSchema>;
