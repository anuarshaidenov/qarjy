import { ModeToggle } from "@/components/mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {};

export const Header = async (props: Props) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;

  return (
    <header className="">
      <div className="container py-4 flex items-center justify-between">
        <Logo />

        <div className="flex gap-4 items-center">
          {(!user || !!error) && (
            <Button asChild>
              <Link href={"/signup"}>Get started</Link>
            </Button>
          )}
          {!!user && (
            <Button asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
          )}
          <ModeToggle />
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
};
