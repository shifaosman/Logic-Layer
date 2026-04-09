import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logic Layer | Structured Digital Systems",
  description:
    "Logic Layer builds structured, layered digital systems for high-growth teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
