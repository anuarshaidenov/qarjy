import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

export const useMethodTabs = (options?: { excludeSections?: string[] }) => {
  const t = useTranslations();
  const methodTabs = [
    {
      value: "503020",
      name: t("tab-list.503020"),
    },
    {
      value: "751015",
      name: t("tab-list.751015"),
    },
    {
      value: "draft",
      name: t("draft"),
      icon: <Pencil className="w-4 h-4" />,
    },
  ];

  return methodTabs.filter(
    (tab) => !options?.excludeSections?.includes(tab.value)
  );
};
