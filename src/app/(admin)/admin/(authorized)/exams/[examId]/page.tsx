import db from "@/services/prisma"
import PageTitle from "@/app/(admin)/_components/ui/title"

import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AdminExamCard } from "@/app/(admin)/_components/exams/exam-card"
import { UpdateExamForm } from "@/app/(admin)/_components/exams/update-exam-form"
import Link from "next/link"
import { adminRoutes } from "@/lib/route"
import { ForceDeleteModal } from "@/app/(admin)/_components/ui/force-delete-modal"
import { forceDeleteExamAction, softDeleteExamAction } from "@/actions/exams"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { CreateQuestionModal } from "@/app/(admin)/_components/exams/questions/create-question-modal"

type Props = {
  params: {
    examId: string
  }
}

export default async function ViewExamPage({ params }: Props) {
  const examId = +params.examId
  const exam = await db.exam.findUnique({ where: { id: examId }, include: { outlines: true } })
  const careers = await db.career.findMany()

  if (!exam) return notFound()

  const title = (
    <span>
      View Exam - <strong>{exam?.title}</strong>
    </span>
  )

  return (
    <div>
      <PageTitle title={title}>
        <DeleteModal forceAction={forceDeleteExamAction} softAction={softDeleteExamAction} id={exam.id} buttonLabel="Delete Exam" />
        <Link href={adminRoutes.examQuestions(examId)}>
          <Button variant="outline-blue">View Questions</Button>
        </Link>
        <CreateQuestionModal examId={exam.id} />
      </PageTitle>

      <section className="grid xl:grid-cols-8 gap-4 grid-cols-1 mt-4">
        <div className="xl:col-span-5">
          <UpdateExamForm careers={careers} exam={exam} />
        </div>
        <div className="xl:col-span-3">
          <AdminExamCard exam={exam} />
        </div>
      </section>
    </div>
  )
}
