import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qarjy",
    short_name: "Qarjy",
    description:
      "Easily manage your finances with our intuitive budgeting tool. Track your expenses, savings, and investments using flexible methods.",
    display: "standalone",
    background_color: "#191919",
    start_url: "/dashboard",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
