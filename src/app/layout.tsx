import { Toaster } from "@/components/ui/sonner";
import { fontMontserrat } from "@/config/fonts";
import { cn } from "@/lib/cn";
import { generateTheme } from "@/lib/theme-generator";
import { loadSettings } from "@/sanity/loader/loadQuery";
import dynamic from "next/dynamic";

const BasicForm = dynamic(
  () => import("@/components/forms/basic-form").then((mod) => mod.BasicForm),
  {
    ssr: false,
  },
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await loadSettings();

  const theme = generateTheme({
    darkOptions: {
      backgroundStyle: "black",
      color: "#BD0BFE",
      isCardsAndBackgroundSameColor: false,
    },
    lightOptions: {
      backgroundStyle: "white",
      color: settings.data.theme?.hex ?? "#000000",
      isCardsAndBackgroundSameColor: false,
    },
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
            :root {
              --background: ${theme.light["--background"]};
              --foreground: ${theme.light["--foreground"]};
              --card: ${theme.light["--card"]};
              --card-foreground: ${theme.light["--card-foreground"]};
              --popover: ${theme.light["--popover"]};
              --popover-foreground: ${theme.light["--popover-foreground"]};
              --primary: ${theme.light["--primary"]};
              --primary-foreground: ${theme.light["--primary-foreground"]};
              --secondary: ${theme.light["--secondary"]};
              --secondary-foreground: ${theme.light["--secondary-foreground"]};
              --muted: ${theme.light["--muted"]};
              --muted-foreground: ${theme.light["--muted-foreground"]};
              --accent: ${theme.light["--accent"]};
              --accent-foreground: ${theme.light["--accent-foreground"]};
              --destructive: ${theme.light["--destructive"]};
              --destructive-foreground: ${theme.light["--destructive-foreground"]};
              --border: ${theme.light["--border"]};
              --input: ${theme.light["--input"]};
              --ring: ${theme.light["--ring"]};
            }
          `}
        </style>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontMontserrat.variable,
        )}
      >
        <Toaster />
        <BasicForm />
        {children}
      </body>
    </html>
  );
}
