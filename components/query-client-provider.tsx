"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export const QueryClientProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};
