import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { type Metadata } from "next";
import Header from "~/components/header";
import { RxdbProvider } from "~/providers/rxdb.provider";
import { ActiveProjectProvider } from "~/providers/active-project.provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Metadraft",
  description: "Metadata validator and tooling",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background antialiased">
        <RxdbProvider>
          <ActiveProjectProvider>
            <Header />
            {children}
          </ActiveProjectProvider>
        </RxdbProvider>
      </body>
    </html>
  );
}
