import { createPagination } from "@/lib/utils"
import db from "@/services/prisma"
import { SearchParams } from "@/types"
import { notFound } from "next/navigation"

import { forceDeleteCareerAction, restoreCareerAction, softDeleteCareerAction } from "@/actions/careers"
import { adminRoutes } from "@/lib/route"

import { UpdateCareerModal, CreateCareerModal } from "@/app/(admin)/_components/careers"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next"
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous"
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Image from "next/image"
import Link from "next/link"
import { CreateLevelModal } from "@/app/(admin)/_components/levels"
import { getCategories } from "@/actions/categories"

type Props = {
  params: { categoryId: string }
  searchParams: SearchParams
}

export default async function ViewCategoryPage({ params, searchParams }: Props) {
  const categoryId = +params.categoryId
  const category = await db.category.findUnique({ where: { id: categoryId } })
  const categories = await getCategories()
  const orderBy = [
    { label: "ID", name: "id" },
    { label: "Name", name: "name" },
  ]
  const pagination = createPagination(searchParams)
  if (!category) return notFound()

  const careers = await db.career.findMany({
    include: { _count: { select: { levels: true } }, category: true },
    orderBy: { [pagination.orderBy ?? "id"]: pagination.orderType ?? "asc" },
    where: { categoryId: category?.id },
    skip: pagination.skip,
    take: pagination.take,
  })

  const pageTitle = (
    <>
      Careers of Category - <b>{category.name}</b>
    </>
  )

  return (
    <div>
      <PageTitle title={pageTitle} parentClassName="mb-4">
        <CreateCareerModal categories={categories} />
      </PageTitle>

      <FilterAll parentClassName="grid grid-cols-4 gap-2" orderByArray={orderBy} searchParams={searchParams} />

      {careers.length == 0 ? (
        <NoDataAlert title="No data to show" />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Levels</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {careers.map((career) => (
              <TableRow key={career.id}>
                <TableCell className="font-medium">{career.id}</TableCell>
                <TableCell className="font-medium">{career.name}</TableCell>
                <TableCell>
                  <Image src={career.icon ?? "/images/categories/hardware.svg"} width={40} height={40} alt="career Icon" />
                </TableCell>
                <TableCell>
                  <Badge>{career._count.levels} levels</Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link href={adminRoutes.viewCareer(career.id)}>
                    <Button variant="blue" size="sm">
                      <Eye className="size-4" /> View
                    </Button>
                  </Link>
                  <CreateLevelModal label="" careers={careers} defaultCareerId={career.id} />
                  {!career.deletedAt ? <DeleteModal id={career.id} softAction={softDeleteCareerAction} forceAction={forceDeleteCareerAction} /> : <RestoreModal id={career.id} action={restoreCareerAction} />}
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
    </div>
  )
}
