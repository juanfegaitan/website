import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Noto_Sans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontNoto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});
