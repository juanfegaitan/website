import { z } from "zod";

export const BasicFormSchema = z.object({
  email: z
    .string()
    .email("El correo debe ser un correo electrónico válido")
    .min(5, "El correo debe tener al menos 5 caracteres")
    .max(255, "El correo debe tener menos de 255 caracteres"),
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(255, "El nombre debe tener menos de 255 caracteres"),
  phone: z
    .string()
    .min(2, "El teléfono debe tener al menos 2 caracteres")
    .max(255, "El teléfono debe tener menos de 255 caracteres"),
});

// TODO mejorar la validacion user react-number-format
// TODO: mejorar la carga de video
