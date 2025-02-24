import { createNavigation } from "next-intl/navigation";
import { LOCALES } from "@/lib/constants";

export const locales = LOCALES;
export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix,
});
