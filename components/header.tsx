import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "@/navigation";
import { LocaleToggle } from "./locale-toggle";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="">
      <div className="container py-4 flex items-center justify-between">
        <Link className="text-xl font-mono" href={"/"}>
          💸 qarjy
        </Link>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
};
