import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";

type Props = {};

export const SeventyFive1015BudgetCard = (props: Props) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold">September budget</h2>
          <div className="flex items-start gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"secondary"} size={"icon"}>
                    <UploadIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button size={"icon"}>
                    <DownloadIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-8"></CardContent>
    </Card>
  );
};
