import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  children: ReactNode;
};

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

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
