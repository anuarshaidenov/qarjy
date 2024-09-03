import { ModeToggle } from "@/components/mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { Logo } from "./logo";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="">
      <div className="container py-4 flex items-center justify-between">
        <Logo />

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
};
