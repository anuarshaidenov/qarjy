import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from '@/lib/constants';

// Can be imported from a shared config
const locales = LOCALES;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
