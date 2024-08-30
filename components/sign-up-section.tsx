import { Link } from "@/navigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

type Props = {};

export const SignupSection = (props: Props) => {
  return (
    <section className="py-40">
      <div className="flex flex-col items-center gap-4 container">
        <h2 className="font-semibold text-2xl md:text-5xl">
          Sign up and track your progress over time.
        </h2>

        <div className="flex flex-col items-center gap-4">
          <p className="md:text-xl">
            Start using qarjy today and see how your budget will change over
            time.
          </p>
        </div>

        <Card className="w-full mt-8">
          <CardHeader></CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </section>
  );
};
