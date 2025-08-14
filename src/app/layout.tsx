import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cursive",
  description: "A lightweight web-based IDE built with Next.js and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
