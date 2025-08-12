import { getProfileData } from "@/actions/get-profile-data";
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
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { ReactivateProfileButton } from "@/components/reactivate-profile-button";
import { UserStatus } from "@/lib/constants";

type Props = {};

const ProfilePage = async (props: Props) => {
  const { data: profileData, error: profileError } = await getProfileData();

  const name = profileData?.display_name?.split(" ")[0] || profileData?.email;
  const fullName = profileData?.display_name || profileData?.email || "User";
  const joinedDate = new Date(profileData?.created_at || "").toLocaleDateString(
    "en-GB"
  );
  const avatarUrl = profileData?.avatar_url;
  const avatarFallback = fullName
    .split(" ")
    .map((name: string) => name.charAt(0).toUpperCase())
    .join("");

  const email = profileData?.email || "No email provided";
  const providers: string[] = profileData?.providers || [];
  const status = profileData?.status;

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] mb-8">
        {name}
        &apos;s Profile
      </h1>
      {status === UserStatus.DELETED && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>
            Your profile is deactivated and will be deleted.
          </AlertTitle>
          <AlertDescription className="mb-4">
            <p>You can reactivate your profile within 30 days.</p>
          </AlertDescription>
          <ReactivateProfileButton />
        </Alert>
      )}
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
          {status === UserStatus.ACTIVE && (
            <div className="flex flex-col gap-2 border-t w-full items-start pt-2">
              <h2 className="text-lg font-bold">Danger zone</h2>
              <DeleteProfileButton />
            </div>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default ProfilePage;
