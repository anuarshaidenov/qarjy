import { ModeToggle } from '@/components/mode-toggle';

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="">
      <div className="container py-4">
        <ModeToggle />
      </div>
    </header>
  );
};
