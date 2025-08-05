import { UserStatus } from "@/lib/constants";

export type Profile = {
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  providers?: string[];
  email: string;
};
