import PageTitle from "@/app/(admin)/_components/ui/title"
import React from "react"

import db from "@/services/prisma"

import { notFound } from "next/navigation"

import { Printer, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SubscriptionActions } from "@/app/(admin)/_components/subscriptions/actions"
import { SubscriptionPaymentDetails } from "@/app/(admin)/_components/subscriptions/payment"
import { SubscriptionDetails } from "@/app/(admin)/_components/subscriptions/details"
import { SubscriptionUser } from "@/app/(admin)/_components/subscriptions/user"

type Props = {
  params: { subscriptionId: string }
}

export async function generateMetadata({ params }: Props) {
  const subscription = await db.subscription.findUnique({
    where: { id: +params.subscriptionId },
    select: { subscriptionId: true },
  })
  return {
    title: `Subscription - ${subscription?.subscriptionId}`,
  }
}

export default async function SubscriptionIdPage({ params }: Props) {
  const subscriptionId = +params.subscriptionId
  const subscription = await db.subscription.findUnique({
    where: { id: subscriptionId },
    include: { user: true, plan: true },
  })

  if (!subscription) return notFound()

  const pageTitle = (
    <span className="items-center flex gap-4">
      Subscription
      <Badge variant="outline" className="h-10 rounded-md bg-white shadow-sm text-lg">
        {subscription?.invoiceId}
      </Badge>
    </span>
  )

  return (
    <div>
      <PageTitle title={pageTitle} parentClassName="mb-4 flex-col gap-4 xl:flex-row md:flex-row">
        <Button variant="success">
          <Printer className="size-4" /> Print
        </Button>
        <Button variant="blue">
          <UserIcon className="size-4" /> View User
        </Button>
      </PageTitle>

      <div className="">
        <div className="grid gap-2 md:grid-cols-2">
          <SubscriptionDetails subscription={subscription} />
          <SubscriptionUser subscription={subscription} />
          <SubscriptionActions subscription={subscription} />
          <SubscriptionPaymentDetails subscription={subscription} />
        </div>
      </div>
    </div>
  )
}
