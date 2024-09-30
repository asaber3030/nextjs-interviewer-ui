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
import { UserActionsDropdown } from "@/app/(admin)/_components/users/actions-dropdown"

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
    title: `Plan: ${plan?.name} users`,
    description: `View users of plan ${plan?.name}`,
  }
}

const ViewPlanIdUsersPage = async ({ searchParams, params }: Props) => {
  const planId = +params.planId
  const plan = await getPlan(planId)

  const countUsers = await db.user.count()
  const pagination = createPaginationByArgs(searchParams, countUsers)

  const users = await db.user.findMany({
    where: {
      planId: planId,
      name: { contains: searchParams.search },
    },
    ...pagination.args,
  })

  if (!plan) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.plans(), label: "Plans" },
    { href: adminRoutes.viewPlan(plan.id), label: `Plan -> ${plan.name}` },
    { href: "", label: "Users", disabled: true },
  ]

  const pageTitle = (
    <span>
      Plan <b>{plan.name}</b> - Users
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

      {users.length === 0 ? (
        <EmptyStateCard />
      ) : (
        <React.Fragment>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>

                  <TableCell>
                    <Image className="rounded-md" src={user.image ? user.image : "/images/defaults/user.svg"} alt={user.name} width={32} height={32} />
                  </TableCell>

                  <TableCell>{user.name}</TableCell>

                  <TableCell>@{user.username}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.lastLogin ? moment(user.lastLogin).fromNow() : <Badge variant="destructive">Not Available</Badge>}</TableCell>

                  <TableCell className="flex gap-1">
                    <Button variant="blue" size="sm" asChild>
                      <Link href={adminRoutes.viewUser(user.id)}>
                        <User className="size-4" />
                        View
                      </Link>
                    </Button>

                    <UserActionsDropdown user={user} />
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

export default ViewPlanIdUsersPage
