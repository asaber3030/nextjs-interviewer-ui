import db from "@/services/prisma"
import moment from "moment"

import Image from "next/image"
import FilterAll from "@/app/(admin)/_components/ui/filter"
import Link from "next/link"
import EmptyStateCard from "@/components/common/empty-state"

import { createPagination, createPaginationByArgs } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next"
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous"
import { SearchParams } from "@/types"
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mail, MoreHorizontal, Printer, User } from "lucide-react"
import { Metadata } from "next"

import { UsersOrderBy } from "@/lib/order-by"
import { DirectionURL, Directions } from "@/components/common/directions"
import { CareerIdTitle } from "@/app/(admin)/_components/careers/career-id-title"
import { notFound } from "next/navigation"
import { findManyCategoreis } from "@/models/category"
import { findManyUsers } from "@/models/user"
import { DefaultTableFooter } from "@/app/(admin)/_components/ui/table-footer"

type Props = {
  searchParams: SearchParams
  params: { careerId: string }
}

export const metadata: Metadata = {
  title: "Career Users",
}

export default async function CareerIdExamsPage({ searchParams, params }: Props) {
  const careerId = +params.careerId
  const career = await db.career.findUnique({ where: { id: careerId } })

  const countUsers = await db.user.count({ where: { careerId } })
  const pagination = createPaginationByArgs(searchParams, countUsers)
  const categories = await findManyCategoreis()

  const users = await findManyUsers({
    where: {
      careerId,
    },
    ...pagination.args,
  })

  const urls: DirectionURL[] = [
    { href: adminRoutes.careers(), label: "Careers" },
    {
      href: adminRoutes.viewCareer(careerId),
      label: (
        <span>
          Career - <b>{career?.name}</b>
        </span>
      ),
    },
    { href: adminRoutes.careers(), label: "Users", disabled: true },
  ]

  if (!career) return notFound()

  return (
    <>
      <CareerIdTitle career={career} categories={categories} />

      <Directions urls={urls} className="my-4" />

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
                  <Link href={adminRoutes.viewUser(user.id)}>
                    <Button variant="outline" size="sm">
                      <User className="size-4" />
                      View
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Link href={adminRoutes.viewUser(user.id)}>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </Link>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                      <DropdownMenuLabel>Available Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
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
      <DefaultTableFooter searchParams={searchParams} hasNextPage={!pagination.hasNextPage} />
    </>
  )
}
