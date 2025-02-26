import type { Viewport, Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { QueryClientProvider } from "@/components/query-client-provider";
import { Toaster } from "@/components/ui/toaster";

import { routing } from "@/i18n/routing";
import { CurrencyProvider } from "@/components/currency-provider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Readonly<{ params: { locale: string } }>
) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
  });

  return {
    title: t("metadata.title"),
    applicationName: t("metadata.title"),
    description: t("metadata.description"),
    authors: [
      {
        name: "Anuar Shaidenov",
        url: "https://anuarshaidenov.vercel.app/",
      },
    ],
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("metadata.openGraph.title"),
    },
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
      locale: params.locale === "kz" ? "kk" : params.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.twitter.title"),
      description: t("metadata.twitter.description"),
      creator: "anuarnyi",
      images: ["og-image.png"],
    },
    robots: "index, follow",
  } as Metadata;
}

export const viewport: Viewport = {
  maximumScale: 1,
  themeColor: "#3b82f6",
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const { children } = props;

  const messages = await getMessages();
  setRequestLocale(params.locale);

  return (
    <html lang={params.locale === "kz" ? "kk" : params.locale}>
      <body
        className={cn(
          "min-h-screen overflow-x-hidden flex flex-col font-sans antialiased selection:bg-foreground selection:text-background",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider>
              <CurrencyProvider>{children}</CurrencyProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
