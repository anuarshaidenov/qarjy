import { signUpWithGoogle } from '@/actions/signup-with-google';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

type Props = {
  params: { locale: string };
};

const LoginPage = async (props: Props) => {
  const t = await getTranslations();
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="h-screen">
      <div className="container flex flex-col items-center justify-center gap-8 h-full w-full">
        <Logo className="text-xl md:text-3xl mr-2" />
        <h1 className="text-5xl md:text-8xl font-bold">{t('signup.title')}</h1>

        <form className="flex flex-col gap-4" action={signUpWithGoogle}>
          <Button> {t('signup.button')}</Button>
          <Button variant={'outline'} asChild>
            <Link href={'/'}>{t('signup.back-button')}</Link>
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
