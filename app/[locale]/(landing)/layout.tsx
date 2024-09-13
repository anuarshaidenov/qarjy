import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const LandingLayout = (props: Props) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Header />
      <main className="h-full grow">{props.children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
