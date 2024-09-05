"use client";

import { Button } from "@/components/ui/button";
import { usePathname, Link } from "@/navigation";
import { useParams } from "next/navigation";

export function LocaleToggle() {
  const pathname = usePathname();
  const params = useParams();

  const locale = params.locale === "kz" ? "en" : "kz";

  return (
    <Button asChild variant="outline" size="icon">
      <Link href={pathname} locale={locale}>
        <span>{locale}</span>
        <span className="sr-only">Toggle locale</span>
      </Link>
    </Button>
  );
}
