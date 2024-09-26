import { Button } from "@/components/ui/button";

import Link from "next/link";
import moment from "moment";

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { SubscriptionQuickViewModal } from "@/app/(admin)/_components/subscriptions/quick-view-modal";
import { SendUserMessageModal } from "@/app/(admin)/_components/users/messages/send-message-modal";
import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next";
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous";

import { FullPlan } from "@/types";
import { Career, Priority, Subscription, User } from "@prisma/client";

import { adminRoutes } from "@/lib/route";

type Props = {
  subscriptions: (Subscription & { plan: FullPlan })[];
  user: User & { career: Career };
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

export async function UserSubscriptionsTable({ subscriptions, user, hasPreviousPage, hasNextPage }: Props) {
  return (
    <>
      {subscriptions.length === 0 ? (
        <div className="text-center text-gray-500">No subscriptions found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.id}</TableCell>
                <TableCell>{sub.invoiceId}</TableCell>
                <TableCell>{moment(sub.subscribedAt).format("DD MMM YYYY")}</TableCell>
                <TableCell>{sub.plan.name}</TableCell>
                <TableCell>
                  <Badge variant={sub.status === "Active" ? "default" : "secondary"}>{sub.status}</Badge>
                </TableCell>
                <TableCell className="space-x-1">
                  <Link href={adminRoutes.viewSubscription(sub.id)}>
                    <Button size="sm">View</Button>
                  </Link>
                  <SubscriptionQuickViewModal subscription={sub} />
                  <Button
                    variant="indigo"
                    size="sm"
                  >
                    Print
                  </Button>
                  <SendUserMessageModal
                    user={user}
                    defaultPriority={Priority.High}
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                    >
                      Send Warning
                    </Button>
                  </SendUserMessageModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!hasNextPage && !hasPreviousPage && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <PaginatePrevious disabled={!hasPreviousPage} />
                </TableCell>
                <TableCell className="text-right">
                  <PaginateNext disabled={!hasNextPage} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </>
  );
}
