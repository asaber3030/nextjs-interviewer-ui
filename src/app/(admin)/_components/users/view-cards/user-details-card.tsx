import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export function UserDetailsCard({ user }: Props) {
  return (
    <Card className="pt-4 h-fit">
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src={user.image ?? "/images/defaults/user.svg"}
            alt={user.name}
          />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <Badge className="mt-2">{user.isActive ? "Active" : "Inactive"}</Badge>
      </CardContent>
    </Card>
  );
}
