import { useTranslations } from "next-intl";

export const useMethodTabs = () => {
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
    },
  ];

  return methodTabs;
};
