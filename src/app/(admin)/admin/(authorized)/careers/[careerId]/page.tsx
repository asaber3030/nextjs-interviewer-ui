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
import { ArrowRight } from "lucide-react"

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

  return (
    <div>
      <PageTitle
        title={
          <span>
            Career - <strong className="font-bold">{career.name}</strong>
          </span>
        }
      >
        <UpdateCareerModal career={career} categories={categories} />
        <CareerDetailsModal career={career} />
        {career.deletedAt ? <RestoreModal id={career.id} action={restoreCareerAction} /> : <DeleteModal id={career.id} softAction={softDeleteCareerAction} forceAction={forceDeleteCareerAction} />}
      </PageTitle>

      {levels.length === 0 ? (
        <NoDataAlert title="No Levels available." />
      ) : (
        <section className="divide-y space-y-2">
          {levels.map((level) => (
            <div className="py-2" key={`level-${level.id}`}>
              <h3 className="text-lg p-2 border px-4 w-fit shadow-sm bg-white rounded-md font-semibold mb-2 flex gap-2 items-center">
                <span>Level</span>
                <ArrowRight className="size-4" />
                <span>{level.name}</span>
              </h3>
              {level.exams.length > 0 ? (
                <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-3">
                  {level.exams.map((exam) => (
                    <AdminExamCard exam={exam} key={`exam-${exam.id}`} />
                  ))}
                </div>
              ) : (
                <NoDataAlert title="No Exams available." parentClassName="mt-0" />
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
