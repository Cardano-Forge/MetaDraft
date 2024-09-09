import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
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
    <html lang="en" className={`${GeistSans.variable} ${inter.variable}`}>
      <RxdbProvider>
        <body>
          <ActiveProjectProvider>
            <Header />
            {children}
          </ActiveProjectProvider>
        </body>
      </RxdbProvider>
    </html>
  );
}
