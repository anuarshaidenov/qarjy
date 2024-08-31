import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {};

export const BudgetCardLocal = (props: Props) => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold">September budget</h2>
          <div className="flex items-start gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"secondary"} size={"icon"}>
                    <DownloadIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <Label>Your monthly income:</Label>
          <p className="font-semibold">20000 KZT</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center justify-between w-full">
            <Label>Essential expenses / needs (50%):</Label>
            <p className="font-semibold">1000 KZT</p>
          </div>
          <ul className="text-sm w-full">
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
          </ul>
        </div>

        <span className="text-red-700 text-end font-semibold text-sm mb-4">
          -3000 KZT
        </span>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label>Wants (30%):</Label>
            <p className="font-semibold">1000 KZT</p>
          </div>
          <ul className="text-sm w-full">
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
            <li className="flex items-center justify-between w-full">
              <span>Food</span> <span>1000 KZT</span>
            </li>
          </ul>
        </div>
        <span className="text-green-700 text-end font-semibold text-sm mb-4">
          +32000 KZT
        </span>
        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label>Savings / investments (20%):</Label>
            <p className="font-semibold">1000 KZT</p>
          </div>
          <p className="text-sm">
            Keep this money in your savings account or in your investments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
