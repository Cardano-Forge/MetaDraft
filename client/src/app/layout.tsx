import "~/styles/globals.css";

import { type Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { env } from "~/env";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Metadraft",
  description:
    "A free-to-use metadata validation built for Cardano. Review your project's NFT metadata, visualize your assets, make updates, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background antialiased">
        <Script
          async
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${env.GA_TRACKING_ID}');
            `,
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
