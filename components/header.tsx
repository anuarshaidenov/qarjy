import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="">
      <div className="container py-4 flex items-center justify-between">
        <Link className="text-xl font-mono" href={'/'}>
          qarjy
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
};
