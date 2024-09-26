"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Subscription } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { FullPlan } from "@/types";
import { CheckCircle } from "lucide-react";

import moment from "moment";
import Link from "next/link";
import { adminRoutes } from "@/lib/route";

type Props = {
  subscription: Subscription & { plan: FullPlan };
};

export function SubscriptionQuickViewModal({ subscription }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="blue"
          size="sm"
        >
          Quick View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Subscription Plan</DialogTitle>
          <DialogDescription>Quick view of your current subscription</DialogDescription>
        </DialogHeader>
        <div className="grid gap-1 py-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{subscription.plan.name}</h3>
            <Badge variant={subscription.status === "Active" ? "default" : "secondary"}>{subscription.status}</Badge>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            Subscribed at: <span>{subscription.subscribedAt ? moment(subscription.subscribedAt).format("DD MMM YYYY") : "Not available"}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            Expires in: <span>{subscription.expiresAt ? moment(subscription.expiresAt).format("DD MMM YYYY") : "Not available"}</span>
          </div>
          <div className="text-2xl font-bold">
            {subscription.plan.price} {subscription.currency}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Features:</h4>
            <ul className="text-sm">
              {subscription.plan.features.map((feature, index) => (
                <li
                  key={feature.id}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="sm"
            >
              Close
            </Button>
          </DialogClose>
          <Link href={adminRoutes.viewSubscription(subscription.id)}>
            <Button
              variant="indigo"
              size="sm"
            >
              View
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
