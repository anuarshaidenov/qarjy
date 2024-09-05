import type { Viewport, Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";

export async function generateMetadata({
  params,
}: Readonly<{ params: { locale: string } }>) {
  const t = await getTranslations({
    locale: params.locale,
  });

  return {
    metadataBase: new URL("https://qarjy.site"),
    alternates: {
      canonical: "/",
      languages: {
        kz: "/kz",
        en: "/en",
      },
    },
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: [
      t("metadata.keywords[0]"),
      t("metadata.keywords[1]"),
      t("metadata.keywords[2]"),
      t("metadata.keywords[3]"),
      t("metadata.keywords[4]"),
      t("metadata.keywords[5]"),
    ],
    authors: [
      {
        name: t("metadata.authors[0].name"),
        url: t("metadata.authors[0].url"),
      },
    ],
    openGraph: {
      title: t("metadata.openGraph.title"),
      description: t("metadata.openGraph.description"),
      url: t("metadata.openGraph.url"),
      siteName: t("metadata.openGraph.siteName"),
      images: [
        {
          url: "og-image.png",
          width: 1200,
          height: 630,
          alt: t("metadata.openGraph.images[0].alt"),
        },
      ],
      locale: params.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.twitter.title"),
      description: t("metadata.twitter.description"),
      creator: "@anuarnyi",
      images: ["og-image.png"],
    },
    robots: "index, follow",
  } as Metadata;
}

export const viewport: Viewport = {
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html className="min-h-screen" lang={params.locale}>
      <body
        className={cn(
          "h-full flex flex-col font-sans",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
