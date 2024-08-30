import { Header } from '@/components/header';

type Props = {
  children: React.ReactNode;
};

const LandingLayout = (props: Props) => {
  return (
    <>
      <Header />
      <main className="h-full grow container">{props.children}</main>
    </>
  );
};

export default LandingLayout;
