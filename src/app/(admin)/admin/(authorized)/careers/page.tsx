import db from "@/services/prisma"

import { forceDeleteCareerAction, restoreCareerAction, softDeleteCareerAction } from "@/actions/careers"
import { createPaginationByArgs } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"

import { UpdateCareerModal, CreateCareerModal } from "@/app/(admin)/_components/careers"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { SearchParams } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { CreateLevelModal } from "@/app/(admin)/_components/levels"
import { Metadata } from "next"
import { DirectionURL, Directions } from "@/components/common/directions"
import { CareersOrderBy } from "@/lib/order-by"
import { LinkBtn } from "@/components/common/button"
import { DefaultTableFooter } from "@/app/(admin)/_components/ui/table-footer"

import FilterAll from "@/app/(admin)/_components/ui/filter"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Image from "next/image"
import Link from "next/link"
import EmptyStateCard from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

type Props = {
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: "Careers",
}

export default async function CareersPage({ searchParams }: Props) {
  const totalCareers = await db.career.count()
  const paginationArgs = createPaginationByArgs(searchParams, totalCareers)
  const categories = await db.category.findMany()

  const careers = await db.career.findMany({
    include: { _count: { select: { levels: true } }, category: true },
    where: {
      name: { contains: searchParams.search },
    },
    ...paginationArgs.args,
  })

  const urls: DirectionURL[] = [{ href: adminRoutes.careers(), label: "Careers", disabled: true }]

  return (
    <>
      <PageTitle title="Careers" parentClassName="mb-4">
        <CreateCareerModal categories={categories} />
      </PageTitle>

      <Directions urls={urls} className="mb-4" />

      <FilterAll parentClassName="grid grid-cols-4 gap-2" orderByArray={CareersOrderBy} searchParams={searchParams} />

      {careers.length == 0 ? (
        <EmptyStateCard />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
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
                <TableCell className="font-medium">
                  <Link className="hover:underline flex items-center p-2 rounded-md hover:bg-gray-50 hover:shadow-sm transition-colors gap-2" href={adminRoutes.viewCategory(career.categoryId)}>
                    <Image src={career.icon ?? "/images/categories/hardware.svg"} width={30} height={30} alt="career Icon" />
                    {career.category.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Image src={career.icon ?? "/images/categories/hardware.svg"} width={30} height={30} alt="career Icon" />
                </TableCell>
                <TableCell>
                  <Badge>{career._count.levels} levels</Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <UpdateCareerModal career={career} categories={categories} />
                  <LinkBtn variant="blue" size="sm" href={adminRoutes.viewCareer(career.id)} icon={Eye}>
                    View
                  </LinkBtn>
                  <CreateLevelModal label="Create Level" careers={careers} defaultCareerId={career.id} />
                  {!career.deletedAt ? (
                    <DeleteModal deletedId={career.id} softAction={softDeleteCareerAction} forceAction={forceDeleteCareerAction} asChild>
                      <Button variant="destructive">Delete</Button>
                    </DeleteModal>
                  ) : (
                    <RestoreModal deletedId={career.id} action={restoreCareerAction} asChild>
                      <Button variant="blue">Restore</Button>
                    </RestoreModal>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <DefaultTableFooter searchParams={searchParams} hasNextPage={!paginationArgs.hasNextPage} />
    </>
  )
}
