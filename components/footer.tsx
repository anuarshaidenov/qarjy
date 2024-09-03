import { Link } from "@/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer className="mt-20">
      <div className="container w-full py-10 md:py-20 flex items-start gap-8 flex-wrap justify-between border-b border-t">
        <Logo />

        <nav className="flex items-start gap-8 flex-wrap">
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="md:text-lg font-semibold">About</h4>
            </li>
            <li>
              <Button asChild variant={"link"}>
                <Link href={"#how-it-works"}>How it works</Link>
              </Button>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="md:text-lg font-semibold">Get Help</h4>
            </li>
            <li>
              <Button asChild variant={"link"}>
                <Link href={"mailto:anuarshaidenov@gmail.com"}>Contact us</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-8 container">
        <p className="text-sm text-border">
          Crafted with ❤️ by the community - Copyright © 2024 Qarjy
        </p>
      </div>
    </footer>
  );
};
