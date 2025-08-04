import { DeleteProfileButton } from "@/components/delete-profile-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import React from "react";

type Props = {};

const ProfilePage = async (props: Props) => {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const name =
    userData.user?.user_metadata?.full_name?.split(" ")[0] ||
    userData.user?.email;
  const fullName =
    userData.user?.user_metadata?.full_name || userData.user?.email || "User";
  const joinedDate = new Date(
    userData.user?.created_at || ""
  ).toLocaleDateString("en-GB");
  const avatarUrl = userData.user?.user_metadata?.avatar_url;
  const avatarFallback = fullName
    .split(" ")
    .map((name: string) => name.charAt(0).toUpperCase())
    .join("");

  const email = userData.user?.email || "No email provided";
  const providers: string[] = userData.user?.app_metadata?.providers || [];

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] mb-8">
        {name}
        &apos;s Profile
      </h1>
      <Card className="w-full md:w-[385px]">
        <CardHeader>
          <Avatar className="mb-4">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <CardTitle>{fullName}</CardTitle>

          <CardDescription>Joined {joinedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2">
            <li>
              <Label className="font-bold">Email:</Label>
              <p className="text-muted-foreground">{email}</p>
            </li>
            <li>
              <Label className="font-bold">Providers:</Label>
              <p className="text-muted-foreground">{providers.join(", ")}</p>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <DeleteProfileButton />
        </CardFooter>
      </Card>
    </section>
  );
};

export default ProfilePage;
