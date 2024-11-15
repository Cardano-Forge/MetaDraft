import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Metadraft",
  description: "A free-to-use metadata validation built for Cardano. Review your project's NFT metadata, visualize your assets, make updates, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
