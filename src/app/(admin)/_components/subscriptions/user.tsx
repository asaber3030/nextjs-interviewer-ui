import { Subscription, User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import moment from "moment";

type Props = {
  subscription: Subscription & { user: User };
};
export const SubscriptionUser = ({ subscription }: Props) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Personal details and account info</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={"/images/defaults/user.svg"}
              alt={subscription.user.name}
            />
            <AvatarFallback>
              {subscription.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{subscription.user.name}</h2>
            <p className="text-muted-foreground">User ID: #{subscription.user.id}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <MailIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{subscription.user.email}</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{subscription.user.username}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>Joined on {moment(subscription.user.createdAt).fromNow()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
