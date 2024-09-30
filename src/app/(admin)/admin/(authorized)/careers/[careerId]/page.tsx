import { UpdateCareerModal } from "@/app/(admin)/_components/careers"
import { CareerDetailsModal } from "@/app/(admin)/_components/careers/career-details-modal"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { NoDataAlert } from "@/app/(admin)/_components/ui/no-data"
import { RestoreModal } from "@/app/(admin)/_components/ui/restore-modal"
import { SearchParams } from "@/types"

import { forceDeleteCareerAction, restoreCareerAction, softDeleteCareerAction } from "@/actions/careers"
import { getCategories } from "@/actions/categories"
import { notFound } from "next/navigation"

import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"

import db from "@/services/prisma"
import { AdminExamCard } from "@/app/(admin)/_components/exams/exam-card"
import { ArrowRight, Hash } from "lucide-react"
import { DirectionURL, Directions } from "@/components/common/directions"
import { adminRoutes } from "@/lib/route"
import EmptyStateCard from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { CareerIdTitle } from "@/app/(admin)/_components/careers/career-id-title"

type Props = {
  params: {
    careerId: string
  }
  searchParams: SearchParams
}

export default async function CareerIdPage({ params, searchParams }: Props) {
  const careerId = Number(params.careerId)
  const levels = await db.level.findMany({
    where: { careerId },
    include: { exams: { where: { title: searchParams.search } }, _count: { select: { exams: true } } },
  })
  const categories = await getCategories()

  const career = await db.career.findUnique({ where: { id: careerId } })

  if (!career) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.careers(), label: "Careers" },
    {
      href: adminRoutes.viewCareer(career.id),
      label: (
        <span>
          Career - <b>{career?.name}</b>
        </span>
      ),
    },
  ]

  return (
    <div>
      <CareerIdTitle career={career} categories={categories} />
      <Directions urls={urls} className="my-4 mb-2" />

      {levels.length === 0 ? (
        <NoDataAlert title="No Levels available." />
      ) : (
        <section className="divide-y space-y-2">
          {levels.map((level) => (
            <div className="py-2" key={`level-${level.id}`}>
              <Link href="" className="text-lg font-semibold flex gap-2 items-center hover:underline mb-2">
                <Hash className="size-4" /> {level.name}
              </Link>
              {level.exams.length > 0 ? (
                <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-3">
                  {level.exams.map((exam) => (
                    <AdminExamCard exam={exam} key={`exam-${exam.id}`} />
                  ))}
                </div>
              ) : (
                <EmptyStateCard title="No Levels Found." />
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
