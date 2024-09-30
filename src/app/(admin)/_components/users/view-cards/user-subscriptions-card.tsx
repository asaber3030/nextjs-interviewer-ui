import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminRoutes } from "@/lib/route"
import { Plan, Subscription } from "@prisma/client"
import { CalendarIcon } from "lucide-react"

import moment from "moment"
import Link from "next/link"

type Props = {
  subscriptions: (Subscription & { plan: Plan })[]
}

export function UserSubscriptionsCard({ subscriptions }: Props) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Last 3 Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        {subscriptions.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-muted-foreground">No subscriptions found.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {subscriptions.slice(0, 3).map((sub) => (
              <li key={sub.id}>
                <Link href={adminRoutes.viewSubscription(sub.id)} className="flex justify-between items-center border font-medium hover:border-orange-200 rounded-md p-1 px-2 transition-colors">
                  <span className="flex items-center text-xs">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {sub.subscribedAt ? moment(sub.subscribedAt).format("DD MMM YYYY") : "N/A"}
                  </span>
                  <Badge variant="secondary">{sub.plan.name}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
