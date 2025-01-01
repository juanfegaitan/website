import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const DownloadResourceFormSchema = z.object({
  email: z
    .string()
    .email("El correo debe ser un correo electrónico válido")
    .min(5, "El correo debe tener al menos 5 caracteres")
    .max(255, "El correo debe tener menos de 255 caracteres"),
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(255, "El nombre debe tener menos de 255 caracteres"),
  phone: z.string({
    message: "El teléfono debe ser un número de teléfono válido"
  })
    .refine((val) => {
      if (!val) return false;
      try {
        return isValidPhoneNumber(val);
      } catch {
        return false;
      }
    }, "El teléfono debe ser un número de teléfono válido"),
  resourceSlug: z.string(),
});
