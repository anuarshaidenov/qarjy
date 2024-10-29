"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetNotesByBudgetId } from "@/hooks/use-get-notes-by-budget-id";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateNotes } from "@/hooks/use-update-notes";

type Props = {};

export const DashboardNotes = (props: Props) => {
  const params = useParams();
  const t = useTranslations();
  const budgetId = params.id as string;

  const { data } = useGetNotesByBudgetId(budgetId);
  const { mutate } = useUpdateNotes();

  const [notes, setNotes] = useState("");
  useEffect(() => {
    if (!data) {
      return;
    }

    setNotes(data[0]?.content || "");
  }, [data]);

  const updateNotes = useDebouncedCallback((value: string) => {
    if (!data) {
      return;
    }
    mutate({ id: data[0].id, text: value });
  }, 500);

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
        <Textarea
          rows={10}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            updateNotes(e.target.value);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
      </CardContent>
    </Card>
  );
};
