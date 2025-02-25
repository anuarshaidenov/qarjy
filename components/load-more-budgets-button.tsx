'use client';

import { Ellipsis } from 'lucide-react';
import { Card } from './ui/card';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Props = {};

export const LoadMoreBudgetsButton = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page');

  const handleClick = () => {
    if (page) {
      router.push(`/dashboard?page=${+page + 1}`);
    }

    if (!page) {
      router.push(`/dashboard?page=2`);
    }
  };

  return (
    <button onClick={handleClick}>
      <Card className="flex items-center h-full justify-center min-h-36">
        <Ellipsis />
      </Card>
    </button>
  );
};
