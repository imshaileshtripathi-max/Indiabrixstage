import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IndiaBrix | Find Your Space. Build Your Future.",
  description:
    "Find Your Space. Build Your Future. Explore the IndiaBrix real estate marketplace preview for homes, rentals, commercial spaces and new projects across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
