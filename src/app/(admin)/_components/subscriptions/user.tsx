import moment from "moment"
import Link from "next/link"

import { Subscription, User } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MailIcon, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { adminRoutes } from "@/lib/route"
import { cn } from "@/lib/utils"

type Props = {
  subscription: Subscription & { user: User }
}
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
            <Link href={adminRoutes.viewUser(subscription.userId)} className="hover:opacity-80 transia">
              <AvatarImage src={"/images/defaults/user.svg"} alt={subscription.user.name} />
            </Link>

            <AvatarFallback>
              {subscription.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{subscription.user.name}</h2>
            <Link href={adminRoutes.viewUser(subscription.userId)} className="text-muted-foreground hover:underline">
              @{subscription.user.username}
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <MailIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{subscription.user.email}</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{subscription.user.username}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className={cn("mr-2 h-4 w-4 opacity-70", !subscription.user.createdAt && "text-red-500")} />
            {subscription.user.createdAt ? <span>Joined on {moment(subscription.user.createdAt).fromNow()}</span> : <p className="text-red-500 text-sm">Not available</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
