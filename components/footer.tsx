import { Link } from "@/navigation";
import { Logo } from "./logo";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer>
      <div className="container w-full py-20 flex items-start gap-8 flex-wrap justify-between border-b border-t">
        <Logo />

        <nav className="flex items-start gap-8 flex-wrap">
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="text-lg font-semibold">About</h4>
            </li>
            <li>
              <Link
                href={"#how-it-works"}
                className="text-sm transition-opacity hover:opacity-70"
              >
                How it works
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="text-lg font-semibold">Get Help</h4>
            </li>
            <li>
              <Link
                href={"mailto:anuarshaidenov@gmail.com"}
                className="text-sm transition-opacity hover:opacity-70"
              >
                Contact us
              </Link>
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
