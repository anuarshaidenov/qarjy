import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = (props: Props) => {
  return (
    <>
      <Header />
      <main className="h-full grow">{props.children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
