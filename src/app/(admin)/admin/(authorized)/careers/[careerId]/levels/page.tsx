import db from "@/services/prisma"

import EmptyStateCard from "@/components/common/empty-state"
import Link from "next/link"

import { forceDeleteLevelAction, restoreLevelAction, softDeleteLevelAction } from "@/actions/levels"
import { findManyCategoreis } from "@/models/category"
import { adminRoutes } from "@/lib/route"
import { notFound } from "next/navigation"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DirectionURL, Directions } from "@/components/common/directions"
import { UpdateLevelModal } from "@/app/(admin)/_components/levels"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { CareerIdTitle } from "@/app/(admin)/_components/careers/career-id-title"
import { Eye } from "lucide-react"
import { SearchParams } from "@/types"
import { Metadata } from "next"

type Props = {
  searchParams: SearchParams
  params: { careerId: string }
}

export const metadata: Metadata = {
  title: "Career Levels",
}

export default async function CareerIdUsersPage({ searchParams, params }: Props) {
  const careerId = +params.careerId
  const career = await db.career.findUnique({ where: { id: careerId } })

  const careers = await db.career.findMany()
  const categories = await findManyCategoreis()

  const levels = await db.level.findMany({
    include: { _count: { select: { exams: true } }, career: true },
    where: {
      careerId,
    },
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
    { href: adminRoutes.careers(), label: "Levels", disabled: true },
  ]

  if (!career) return notFound()

  return (
    <>
      <CareerIdTitle career={career} categories={categories} />

      <Directions urls={urls} className="my-4" />

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
                  {!level.deletedAt ? <DeleteModal id={level.id} softAction={softDeleteLevelAction} forceAction={forceDeleteLevelAction} /> : <RestoreModal deletedId={level.id} action={restoreLevelAction} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
