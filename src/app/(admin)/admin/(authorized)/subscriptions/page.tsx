import Link from "next/link"
import Image from "next/image"
import React from "react"
import PageTitle from "@/app/(admin)/_components/ui/title"
import EmptyStateCard from "@/components/common/empty-state"

import db from "@/services/prisma"
import moment from "moment"

import { adminRoutes } from "@/lib/route"
import { formatNumber } from "@/lib/utils"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Eye, FileSymlink, Mail, MoreHorizontal, Printer, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscriptions",
}

export default async function SubscriptionsPage() {
  const subscriptions = await db.subscription.findMany({
    include: { user: { select: { id: true, name: true, username: true } }, plan: { select: { id: true, name: true } } },
  })

  return (
    <div>
      <PageTitle title="Subscriptions" parentClassName="mb-2">
        <Button variant="success">
          <Mail className="size-4" /> Send Mails
        </Button>
        <Button variant="blue">
          <FileSymlink className="size-4" /> Export
        </Button>
      </PageTitle>
      {subscriptions.length == 0 ? (
        <EmptyStateCard />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Sub Total</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Subscribed At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.id}</TableCell>
                <TableCell className="w-[300px]">
                  <Link className="px-4 py-2 flex gap-4 text-sm rounded-md font-semibold hover:bg-gray-100 transition-colors w-fit items-center" href={adminRoutes.viewUser(subscription.user.id)}>
                    <Image src={"/images/defaults/user.svg"} width={40} height={40} alt="User" className="rounded-md" />
                    <div>
                      <p>{subscription.user.name}</p>
                      <p className="text-xs font-medium">@{subscription.user.username}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link className="text-blue-600 hover:underline" href={adminRoutes.updatePlan(subscription.plan.id)}>
                    {subscription.plan.name}
                  </Link>
                </TableCell>
                <TableCell className="text-green-600 font-bold">
                  {formatNumber(subscription.subTotal)} {subscription.currency}
                </TableCell>
                <TableCell className="text-green-600 font-bold">
                  {formatNumber(subscription.total)} {subscription.currency}
                </TableCell>
                <TableCell>{subscription.subscribedAt ? moment(subscription.subscribedAt).fromNow() : <Badge variant="destructive">Not-Available</Badge>}</TableCell>
                <TableCell>{subscription.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                      <DropdownMenuLabel>Available Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={adminRoutes.viewSubscription(subscription.id)} className="flex gap-2 items-center">
                          <Eye className="size-4" /> View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <User className="size-4" /> View User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <Printer className="size-4" /> Print
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <Mail className="size-4" /> Mail User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
