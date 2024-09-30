import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkBtn } from "@/components/common/button"
import { ChevronRight } from "lucide-react"
import { Subscription, User } from "@prisma/client"

import { defaultImagePlaceholder } from "@/lib/constants"
import { adminRoutes } from "@/lib/route"

import Link from "next/link"
import moment from "moment"

type Props = {
  subscription: Subscription & { user: User }
}

export const LatestSubscriptionCard = ({ subscription }: Props) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm transition-colors border hover:border-orange-200">
      <section className="flex gap-2 items-center">
        <Avatar className="size-12">
          <Link href={adminRoutes.viewUser(subscription.userId)}>
            <AvatarImage className="object-cover" src={subscription.user.image ?? defaultImagePlaceholder} />
          </Link>
          <AvatarFallback>{subscription.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{subscription.user.name}</p>
          <Link className="text-gray-500 text-xs" href={adminRoutes.viewUser(subscription.userId)}>
            @{subscription.user.username}
          </Link>
        </div>
      </section>
      <section className="mt-5 flex justify-between items-center">
        <p className="text-sm text-gray-500">Subscribed {subscription.subscribedAt ? moment(subscription.subscribedAt).fromNow() : <span className="text-orange-600">Not available</span>}</p>
        <LinkBtn size="sm" variant="indigo" href={adminRoutes.viewSubscription(subscription.id)}>
          View <ChevronRight className="size-4" />
        </LinkBtn>
      </section>
    </div>
  )
}
