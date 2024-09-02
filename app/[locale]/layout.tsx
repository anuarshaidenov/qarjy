import type { Metadata, Viewport } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Qarjy - Simple Budgeting App",
  description:
    "Easily manage your finances with our intuitive budgeting tool. Track your expenses, savings, and investments using flexible methods.",
  keywords: [
    "budgeting app",
    "personal finance",
    "money management",
    "expense tracking",
    "savings",
    "investments",
  ],
  authors: [
    { name: "Anuar Shaidenov", url: "https://anuarshaidenov.vercel.app/" },
  ],
  openGraph: {
    title: "Qarjy - Manage Your Finances Easily",
    description:
      "Take control of your financial future with our easy-to-use budgeting app. Track your income, expenses, and savings all in one place.",
    url: "https://qarjy.site",
    siteName: "Qarjy - Simple Budgeting App",
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Qarjy App Screenshot",
      },
    ],
    locale: "en_US, kk_KZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qarjy - Manage Your Finances Easily",
    description:
      "A simple way to plan your budget and manage your money effectively. Try our budgeting app today!",
    creator: "@anuarnyi",
    images: ["og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

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
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
