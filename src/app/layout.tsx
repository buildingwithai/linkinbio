import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jovanny's Links",
  description: "Connect with Jovanny on various platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ padding: 0, margin: 0, position: 'relative', minHeight: '100vh' }}>
        <main className="min-h-screen relative" style={{ padding: 0 }}>
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
} 