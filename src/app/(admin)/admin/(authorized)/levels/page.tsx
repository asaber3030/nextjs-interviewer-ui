import db from "@/services/prisma"

import { forceDeleteLevelAction, restoreLevelAction, softDeleteLevelAction } from "@/actions/levels"
import { createPagination } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UpdateLevelModal, CreateLevelModal } from "@/app/(admin)/_components/levels"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next"
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous"
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Metadata } from "next"
import { SearchParams } from "@/types"

import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"
import EmptyStateCard from "@/components/common/empty-state"

export const metadata: Metadata = {
  title: "Levels",
}
type Props = {
  searchParams: SearchParams
}

export default async function LevelsPage({ searchParams }: Props) {
  const orderBy = [
    { label: "ID", name: "id" },
    { label: "Name", name: "name" },
  ]

  const pagination = createPagination(searchParams)
  const careers = await db.career.findMany()

  const levels = await db.level.findMany({
    include: { _count: { select: { exams: true } }, career: true },
    orderBy: { [pagination.orderBy ?? "id"]: pagination.orderType ?? "asc" },
    where: { name: { contains: searchParams.search ?? "" } },
    skip: pagination.skip,
    take: pagination.take,
  })

  return (
    <>
      <PageTitle title="Levels" parentClassName="mb-4">
        <CreateLevelModal careers={careers} />
      </PageTitle>

      <FilterAll parentClassName="grid grid-cols-4 gap-2" orderByArray={orderBy} searchParams={searchParams} />

      {levels.length == 0 ? (
        <EmptyStateCard />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Career</TableHead>
              <TableHead>Exams</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levels.map((level) => (
              <TableRow key={level.id}>
                <TableCell>{level.id}</TableCell>
                <TableCell>{level.name}</TableCell>
                <TableCell>{level.career.name}</TableCell>
                <TableCell>
                  <Badge>{level._count.exams} exams</Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <UpdateLevelModal level={level} careers={careers} />
                  <Link href={adminRoutes.viewLevel(level.id)}>
                    <Button variant="blue" size="sm">
                      <Eye className="size-4" /> View
                    </Button>
                  </Link>
                  {!level.deletedAt ? <DeleteModal id={level.id} softAction={softDeleteLevelAction} forceAction={forceDeleteLevelAction} /> : <RestoreModal id={level.id} action={restoreLevelAction} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
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
  )
}
