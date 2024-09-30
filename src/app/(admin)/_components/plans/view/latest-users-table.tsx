import db from "@/services/prisma"
import moment from "moment"

import Image from "next/image"
import Link from "next/link"

import { adminRoutes } from "@/lib/route"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserIcon } from "lucide-react"
import { UserActionsDropdown } from "@/app/(admin)/_components/users/actions-dropdown"

type Props = {
  planId: number
}

export const LatestPlanUsersTable = async ({ planId }: Props) => {
  const users = await db.user.findMany({
    where: {
      planId,
    },
    take: 5,
  })

  return (
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
                  <UserIcon className="size-4" />
                  View
                </Link>
              </Button>

              <UserActionsDropdown user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
