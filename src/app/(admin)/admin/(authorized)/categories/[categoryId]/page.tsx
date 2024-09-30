import db from "@/services/prisma"

import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Image from "next/image"
import Link from "next/link"

import { createPaginationByArgs } from "@/lib/utils"
import { notFound } from "next/navigation"
import { forceDeleteCareerAction, restoreCareerAction, softDeleteCareerAction } from "@/actions/careers"
import { adminRoutes } from "@/lib/route"
import { getCategories } from "@/actions/categories"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreateCareerModal } from "@/app/(admin)/_components/careers"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data"
import { CreateLevelModal } from "@/app/(admin)/_components/levels"
import { DefaultTableFooter } from "@/app/(admin)/_components/ui/table-footer"
import { CareersOrderBy } from "@/lib/order-by"
import { SearchParams } from "@/types"
import { Eye } from "lucide-react"

type Props = {
  params: { categoryId: string }
  searchParams: SearchParams
}

export default async function ViewCategoryPage({ params, searchParams }: Props) {
  const categoryId = +params.categoryId
  const category = await db.category.findUnique({ where: { id: categoryId } })

  const categories = await getCategories()

  const countCareers = await db.career.count({ where: { categoryId } })
  const pagination = createPaginationByArgs(searchParams, countCareers)

  if (!category) return notFound()

  const careers = await db.career.findMany({
    include: { _count: { select: { levels: true } }, category: true },
    where: { categoryId: category?.id },
    ...pagination.args,
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

      <FilterAll parentClassName="grid grid-cols-4 gap-2" orderByArray={CareersOrderBy} searchParams={searchParams} />

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
                  {!career.deletedAt ? <DeleteModal id={career.id} softAction={softDeleteCareerAction} forceAction={forceDeleteCareerAction} /> : <RestoreModal deletedId={career.id} action={restoreCareerAction} />}
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
