import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plan, Subscription } from "@prisma/client"

import moment from "moment"

type Props = {
  subscription: Subscription & { plan: Plan }
}

export const SubscriptionDetails = ({ subscription }: Props) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Current plan and billing information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Plan:</span>
            <Badge variant="secondary">{subscription.plan.name}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Status:</span>
            <Badge variant="success">{subscription.status}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Currency</span>
            <span>{subscription.currency}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Subscribed At</span>
            <span>{subscription.subscribedAt ? moment(subscription.subscribedAt).fromNow() : <Badge variant="destructive">Not-Available</Badge>}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-lg font-bold">
              {subscription.subTotal} {subscription.currency}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
