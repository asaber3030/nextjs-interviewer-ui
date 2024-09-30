import db from "@/services/prisma"

import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Image from "next/image"
import Link from "next/link"
import EmptyStateCard from "@/components/common/empty-state"

import { createPagination, createPaginationByArgs } from "@/lib/utils"
import { forceDeleteCategoryAction, restoreCategoryAction, softDeleteCategoryAction } from "@/actions/categories"
import { adminRoutes } from "@/lib/route"

import { PaginateNext } from "@/app/(admin)/_components/ui/pagination/paginate-next"
import { PaginatePrevious } from "@/app/(admin)/_components/ui/pagination/paginate-previous"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchParams } from "@/types"
import { Badge } from "@/components/ui/badge"

import { UpdateCategoryModal, CreateCategoryModal } from "@/app/(admin)/_components/categories"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { CategoriesOrderBy } from "@/lib/order-by"
import { DefaultTableFooter } from "@/app/(admin)/_components/ui/table-footer"

type Props = {
  searchParams: SearchParams
}

export default async function CategoriesPage({ searchParams }: Props) {
  const countCategories = await db.category.count()
  const pagination = createPaginationByArgs(searchParams, countCategories)

  const categories = await db.category.findMany({
    include: { _count: { select: { careers: true } } },
    ...pagination.args,
  })

  return (
    <div>
      <PageTitle title="Categories" parentClassName="mb-4">
        <CreateCategoryModal />
      </PageTitle>

      <FilterAll parentClassName="grid grid-cols-4 gap-2" orderByArray={CategoriesOrderBy} searchParams={searchParams} />
      {categories.length === 0 ? (
        <EmptyStateCard />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Careers</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <Image src={category.icon} width={40} height={40} alt="Category Icon" />
                </TableCell>
                <TableCell>
                  <Badge>{category._count.careers} careers</Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <UpdateCategoryModal category={category} />
                  {!category.deletedAt ? <DeleteModal id={category.id} softAction={softDeleteCategoryAction} forceAction={forceDeleteCategoryAction} /> : <RestoreModal deletedId={category.id} action={restoreCategoryAction} />}
                  <Link href={adminRoutes.viewCategory(category.id)}>
                    <Button variant="outline-default" size="sm">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <DefaultTableFooter hasNextPage={!pagination.hasNextPage} searchParams={searchParams} />
    </div>
  )
}
