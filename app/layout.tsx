import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Qarjy - Simple, Free budgeting app.",
  openGraph: {
    title: "Qarjy - Simple, Free budgeting app.",
    description:
      "Take control of your financial future with our easy-to-use, absolutely free budgeting app. Track your income, expenses, and savings all in one place.",
    url: "https://qarjy.site",
    siteName: "Qarjy - Simple, Free budgeting app.",
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Qarjy app screen",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    title: "Qarjy - Simple, Free budgeting app.",
    description: "Qarjy - Simple, Free budgeting app.",
    card: "summary_large_image",
    creator: "anuarnyi",
    images: ["og-image.png"],
  },
  metadataBase: new URL("https://qarjy.site"),
  alternates: {
    canonical: "/",
    languages: {
      kk: "/kz",
      en: "/en",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Qarjy - Simple, Free budgeting app.",
    startupImage: "/apple-touch-icon.png",
  },
  applicationName: "Qarjy",
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
