"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetNotesByBudgetId } from "@/hooks/use-get-notes-by-budget-id";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {};

export const DashboardNotes = (props: Props) => {
  const params = useParams();
  const t = useTranslations();
  const budgetId = params.id as string;

  const { data, isLoading } = useGetNotesByBudgetId(budgetId);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!data) {
      return;
    }

    setNotes(data[0]?.content || "");
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold">
            {t("dashboard-notes.title")}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea rows={10} value={notes} />
      </CardContent>
    </Card>
  );
};
