import db from "@/services/prisma"
import moment from "moment"

import CreateFeatureModal from "@/app/(admin)/_components/plans/features/create-feature-dialog"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import EmptyStateCard from "@/components/common/empty-state"
import FilterAll from "@/app/(admin)/_components/ui/filter"

import { getPlan } from "@/actions/app"
import { notFound } from "next/navigation"
import { adminRoutes } from "@/lib/route"
import { formatNumber } from "@/lib/utils"
import { createPaginationByArgs } from "@/lib/utils"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Cog } from "lucide-react"
import { DirectionURL, Directions } from "@/components/common/directions"
import { LinkBtn } from "@/components/common/button"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Eye, Mail, MoreHorizontal, Printer, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SubscriptionsOrderBy } from "@/lib/order-by"
import { DefaultTableFooter } from "@/app/(admin)/_components/ui/table-footer"

type Props = {
  params: {
    planId: string
  }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props) {
  const planId = +params.planId
  const plan = await db.plan.findUnique({ where: { id: planId }, select: { name: true } })
  return {
    title: `Plan: ${plan?.name} Subscriptions`,
    description: `View subscriptions of plan ${plan?.name}`,
  }
}

const ViewPlanIdSubscriptionsPage = async ({ searchParams, params }: Props) => {
  const planId = +params.planId
  const plan = await getPlan(planId)

  const countSubscriptions = await db.subscription.count({ where: { planId: planId } })
  const pagination = createPaginationByArgs(searchParams, countSubscriptions)

  const subscriptions = await db.subscription.findMany({
    where: {
      planId: planId,
      user: {
        name: { contains: searchParams.search },
      },
    },
    include: { user: { select: { id: true, name: true, username: true } }, plan: { select: { id: true, name: true } } },
    ...pagination.args,
  })

  if (!plan) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.plans(), label: "Plans" },
    { href: adminRoutes.viewPlan(plan.id), label: `Plan -> ${plan.name}` },
    { href: "", label: "Subscriptions", disabled: true },
  ]

  const pageTitle = (
    <span>
      Plan <b>{plan.name}</b> - Subscriptions
    </span>
  )

  return (
    <div>
      <PageTitle title={pageTitle}>
        <LinkBtn icon={Cog} size="sm" href={adminRoutes.updatePlan(plan.id)}>
          Update
        </LinkBtn>
        <CreateFeatureModal planId={plan.id} />
      </PageTitle>
      <Directions urls={urls} className="my-4" />

      <FilterAll orderByArray={SubscriptionsOrderBy} searchParams={searchParams} parentClassName="grid grid-cols-4 gap-2 mb-4" />

      {subscriptions.length === 0 ? (
        <EmptyStateCard />
      ) : (
        <React.Fragment>
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
          <DefaultTableFooter hasNextPage={!pagination.hasNextPage} searchParams={searchParams} />
        </React.Fragment>
      )}
    </div>
  )
}

export default ViewPlanIdSubscriptionsPage
