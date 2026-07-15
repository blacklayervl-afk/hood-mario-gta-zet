import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TET HOOD - Open World Mini-Planet Adventure",
  description:
    "TET HOOD: An open world mini-planet adventure game built with Next.js, React Three Fiber, and Three.js. Explore 8 unique zones on a spherical planet.",
  keywords: [
    "TET HOOD",
    "Hood Mario GTA Zet",
    "3D game",
    "Next.js",
    "Three.js",
    "React Three Fiber",
    "mini planet",
    "open world",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
