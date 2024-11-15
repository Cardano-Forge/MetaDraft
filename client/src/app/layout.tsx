import "~/styles/globals.css";

import { type Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { env } from "~/env";

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
      </body>
    </html>
  );
}
