import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"

import { UpdateLevelModal, CreateLevelModal } from "@/app/(admin)/_components/levels"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next"
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous"
import { SearchParams } from "@/types"
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"
import { forceDeleteLevelAction, restoreLevelAction, softDeleteLevelAction } from "@/actions/levels"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"

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
        <NoDataAlert title="No data to show" />
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
