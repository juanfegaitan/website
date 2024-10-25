import { tv } from "tailwind-variants";

export const title = tv({
  variants: {
    size: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
    },
    fullWidth: {
      true: "w-full block",
    },
    truncate: {
      true: "truncate",
    },
  },
});
