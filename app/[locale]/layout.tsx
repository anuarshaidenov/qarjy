import type { Viewport, Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';

export async function generateMetadata({
  params,
}: Readonly<{ params: { locale: string } }>) {
  if (params.locale === 'kz') {
    return {
      title: 'Qarjy - Жай Бюджетті Жоспарлау Қосымшасы',
      description:
        'Қаржыңызды біздің интуитивті бюджетті жоспарлау құралы арқылы оңай басқарыңыз. Шығындарыңызды, жинақтарыңызды және инвестицияларыңызды икемді әдістер арқылы қадағалаңыз.',
      keywords: [
        'бюджетті жоспарлау қосымшасы',
        'жеке қаржы',
        'ақша басқару',
        'шығындарды қадағалау',
        'жинақтар',
        'инвестициялар',
      ],
      authors: [
        { name: 'Anuar Shaidenov', url: 'https://anuarshaidenov.vercel.app/' },
      ],
      openGraph: {
        title: 'Qarjy - Қаржыңызды Оңай Басқарыңыз',
        description:
          'Қаржылық болашағыңызды біздің пайдалануға ыңғайлы бюджетті жоспарлау қосымшамызбен бақылауға алыңыз. Табыс, шығындар және жинақтарды бір жерден бақылаңыз.',
        url: 'https://qarjy.site',
        siteName: 'Qarjy - Жай Бюджетті Жоспарлау Қосымшасы',
        images: [
          {
            url: 'og-image.png',
            width: 1200,
            height: 630,
            alt: 'Qarjy Қосымшасының Скриншоты',
          },
        ],
        locale: 'kk_KZ',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Qarjy - Қаржыңызды Оңай Басқарыңыз',
        description:
          'Бюджетті жоспарлаудың және ақшаңызды тиімді басқарудың қарапайым тәсілі. Біздің бюджетті жоспарлау қосымшамызды бүгіннен бастап көріңіз!',
        creator: '@anuarnyi',
        images: ['og-image.png'],
      },
      robots: 'index, follow',
    } as Metadata;
  }

  return {
    title: 'Qarjy - Simple Budgeting App',
    description:
      'Easily manage your finances with our intuitive budgeting tool. Track your expenses, savings, and investments using flexible methods.',
    keywords: [
      'budgeting app',
      'personal finance',
      'money management',
      'expense tracking',
      'savings',
      'investments',
    ],
    authors: [
      { name: 'Anuar Shaidenov', url: 'https://anuarshaidenov.vercel.app/' },
    ],
    openGraph: {
      title: 'Qarjy - Manage Your Finances Easily',
      description:
        'Take control of your financial future with our easy-to-use budgeting app. Track your income, expenses, and savings all in one place.',
      url: 'https://qarjy.site',
      siteName: 'Qarjy - Simple Budgeting App',
      images: [
        {
          url: 'og-image.png',
          width: 1200,
          height: 630,
          alt: 'Qarjy App Screenshot',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Qarjy - Manage Your Finances Easily',
      description:
        'A simple way to plan your budget and manage your money effectively. Try our budgeting app today!',
      creator: '@anuarnyi',
      images: ['og-image.png'],
    },
    robots: 'index, follow',
  } as Metadata;
}

export const viewport: Viewport = {
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body
        className={cn(
          'min-h-screen flex flex-col font-sans',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
