import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";

type Props = {
  className?: string;
  title?: string;
};

export const ComingSoonCard = ({ className, title = "Coming Soon" }: Props) => {
  return (
    <Card className={cn(className)}>
      <CardHeader />
      <CardContent className="text-center flex items-center justify-center h-full">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </CardContent>
      <CardFooter />
    </Card>
  );
};
