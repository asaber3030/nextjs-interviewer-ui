import db from "@/services/prisma"
import moment from "moment"

import Image from "next/image"
import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"
import EmptyStateCard from "@/components/common/empty-state"

import { createPaginationByArgs } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"
import { getPlans } from "@/actions/plans"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchParams } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { Metadata } from "next"
import { CreateUserModal } from "@/app/(admin)/_components/users/create-user-modal"
import { DefaultTableFooter } from "@/app/(admin)/_components/ui/table-footer"
import { UsersOrderBy } from "@/lib/order-by"
import { UserActionsDropdown } from "@/app/(admin)/_components/users/actions-dropdown"
import { DirectionURL, Directions } from "@/components/common/directions"

type Props = {
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: "Users",
}

export default async function UsersPage({ searchParams }: Props) {
  const countUsers = await db.user.count()
  const pagination = createPaginationByArgs(searchParams, countUsers)
  const plans = await getPlans()
  const careers = await db.career.findMany()

  const users = await db.user.findMany({
    where: {
      name: { contains: searchParams.search },
    },
    ...pagination.args,
  })

  const urls: DirectionURL[] = [{ href: adminRoutes.users(), label: "Users", disabled: true }]

  return (
    <div>
      <PageTitle title="Users" parentClassName="mb-4">
        <CreateUserModal plans={plans} careers={careers} />
      </PageTitle>

      <Directions urls={urls} className="mb-4" />

      <FilterAll parentClassName="grid grid-cols-4 gap-2" orderByArray={UsersOrderBy} searchParams={searchParams} />

      {users.length == 0 ? (
        <EmptyStateCard />
      ) : (
        <Table className="mt-4">
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
      )}

      <DefaultTableFooter searchParams={searchParams} hasNextPage={!pagination.hasNextPage} />
    </div>
  )
}
