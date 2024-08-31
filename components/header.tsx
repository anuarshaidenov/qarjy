import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "@/navigation";
import { LocaleToggle } from "./locale-toggle";
import { Button } from "./ui/button";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="">
      <div className="container py-4 flex items-center justify-between">
        <Link className="text-xl font-mono" href={"/"}>
          qarjy
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href={"/about"}>How to use</Link>
            </li>
          </ul>
        </nav>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
};
