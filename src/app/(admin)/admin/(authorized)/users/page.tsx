import db from "@/services/prisma";
import Image from "next/image";

import { createPagination } from "@/lib/utils";
import { adminRoutes } from "@/lib/route";

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next";
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous";
import { SearchParams } from "@/types";
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, MoreHorizontal, Printer, User } from "lucide-react";
import { Metadata } from "next";

import FilterAll from "@/app/(admin)/_components/ui/filter";
import PageTitle from "@/app/(admin)/_components/ui/title";
import Link from "next/link";
import moment from "moment";
import { getPlans } from "@/actions/plans";
import { CreateUserModal } from "@/app/(admin)/_components/users/create-user-modal";

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage({ searchParams }: Props) {
  const orderBy = [
    { label: "ID", name: "id" },
    { label: "Name", name: "name" },
  ];

  const pagination = createPagination(searchParams);
  const plans = await getPlans();
  const careers = await db.career.findMany();

  const users = await db.user.findMany({
    orderBy: { [pagination.orderBy ?? "id"]: pagination.orderType ?? "asc" },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <>
      <PageTitle
        title="Users"
        parentClassName="mb-4"
      >
        <CreateUserModal
          plans={plans}
          careers={careers}
        />
      </PageTitle>

      <FilterAll
        parentClassName="grid grid-cols-4 gap-2"
        orderByArray={orderBy}
        searchParams={searchParams}
      />

      {users.length == 0 ? (
        <NoDataAlert title="No data to show" />
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
                  <Image
                    className="rounded-md"
                    src={user.image ? user.image : "/images/defaults/user.svg"}
                    alt={user.name}
                    width={32}
                    height={32}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.lastLogin ? moment(user.lastLogin).fromNow() : <Badge variant="destructive">Not Available</Badge>}</TableCell>
                <TableCell className="flex gap-1">
                  <Link href={adminRoutes.viewUser(user.id)}>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <User className="size-4" />
                      View
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Link href={adminRoutes.viewUser(user.id)}>
                        <Button
                          variant="outline"
                          size="sm"
                        >
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

          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <PaginatePrevious />
              </TableCell>
              <TableCell className="text-right">
                <PaginateNext />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
}
