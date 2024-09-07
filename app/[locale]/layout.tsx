import type { Viewport, Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { QueryClientProvider } from "@/components/query-client-provider";
import { Toaster } from "@/components/ui/toaster";

export async function generateMetadata({
  params,
}: Readonly<{ params: { locale: string } }>) {
  const t = await getTranslations({
    locale: params.locale,
  });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    authors: [
      {
        name: "Anuar Shaidenov",
        url: "https://anuarshaidenov.vercel.app/",
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
          alt: "Qarjy app screen",
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
    <html lang={params.locale}>
      <body
        className={cn(
          "min-h-screen flex flex-col font-sans",
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
            <QueryClientProvider>{children}</QueryClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
