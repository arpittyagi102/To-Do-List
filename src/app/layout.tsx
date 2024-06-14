import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({ subsets: ["latin"], weight: "400"});

export const metadata: Metadata = {
  title: "To Do List",
  description: "Simple and robust to do list created by Arpit Tyagi using Next.js, typescript and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mukta.className}>{children}</body>
    </html>
  );
}
