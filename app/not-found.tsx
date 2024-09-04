"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-background dark flex flex-col items-center font-mono justify-center min-h-screen">
        <h2 className="text-8xl md:text-[30vw] font-bold">404</h2>
        <Button asChild>
          <Link href={"/"}>Go Home</Link>
        </Button>
      </body>
    </html>
  );
}
