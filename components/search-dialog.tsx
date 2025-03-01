'use client';

import React from 'react';
import { useCommandDialog } from './command-dialog-provider';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './ui/command';
import { Loader, Plus } from 'lucide-react';
import { createBudget } from '@/actions/create-budget';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useGetBudgets } from '@/hooks/use-get-budgets';
import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

type Props = {};

export const SearchDialog = (props: Props) => {
  const { open, setOpen } = useCommandDialog();
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useGetBudgets({ page: 1, pageSize: 5 });
  const t = useTranslations();

  const handleCreateBudget = () => {
    startTransition(async () => {
      toast({
        title: 'Creating budget',
        description: "Please wait while we're preparing your new budget",
        variant: 'default',
      });

      const { data, error } = await createBudget();

      if (error || !data) {
        toast({
          title: 'Error creating budget',
          description: error?.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Budget created',
        description: 'Your new budget has been created',
        variant: 'default',
      });

      router.push(`/dashboard/budget/${data[0].id}`);

      setOpen(false);
    });
  };

  const handleOpenDashboard = () => {
    router.push('/dashboard');
    setOpen(false);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleCreateBudget();
      }
      if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpenDashboard();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t('search.placeholder')} />
      <CommandList>
        <CommandEmpty>{t('search.empty')}</CommandEmpty>
        <CommandGroup heading={t('search.suggestions')}>
          {data?.data.map((budget) => (
            <CommandLink
              key={budget.id}
              onSelect={() => {
                setOpen(false);
              }}
              href={`/dashboard/budget/${budget.id}`}
            >
              {budget.title}
            </CommandLink>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('search.commands')}>
          <CommandItem onSelect={handleCreateBudget}>
            {isPending ? <Loader className="animate-spin" /> : <Plus />}
            <span>{t('search.new')}</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleOpenDashboard}>
            <DashboardIcon />
            <span>{t('search.dashboard')}</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

const CommandLink = ({
  onSelect,
  href,
  children,
}: {
  onSelect: () => void;
  href: string;
  children: React.ReactNode;
}) => {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const handleOpenBudget = () => {
    ref.current?.click();
    onSelect();
  };
  return (
    <CommandItem onSelect={handleOpenBudget}>
      <Link ref={ref} href={href}>
        {children}
      </Link>
    </CommandItem>
  );
};
