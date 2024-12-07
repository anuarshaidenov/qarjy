import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const supabase = createClient();

  return useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: () => {
      return supabase.auth.getUser();
    },
  });
};
