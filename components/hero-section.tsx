import { useTranslations } from 'next-intl';

type Props = {};

export const HeroSection = (props: Props) => {
  const t = useTranslations('home.hero');

  return (
    <section className="py-16 overflow-hidden flex flex-col gap-8 min-h-[600vh] relative">
      <h1 className="text-center text-2xl md:text-5xl font-bold">
        {t('title')}
      </h1>
    </section>
  );
};
