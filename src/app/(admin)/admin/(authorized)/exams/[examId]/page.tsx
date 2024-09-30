import db from "@/services/prisma"
import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"

import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AdminExamCard } from "@/app/(admin)/_components/exams/exam-card"
import { UpdateExamForm } from "@/app/(admin)/_components/exams/update-exam-form"
import { adminRoutes } from "@/lib/route"
import { forceDeleteExamAction, softDeleteExamAction } from "@/actions/exams"
import { DeleteModal } from "@/app/(admin)/_components/ui/delete-modal"
import { CreateQuestionModal } from "@/app/(admin)/_components/exams/questions/create-question-modal"
import { Btn, LinkBtn } from "@/components/common/button"
import { Trash } from "lucide-react"

type Props = {
  params: {
    examId: string
  }
}

export async function generateMetadata({ params }: Props) {
  const examId = +params.examId
  const exam = await db.exam.findUnique({ where: { id: examId }, select: { title: true } })

  return {
    title: `View Exam - ${exam?.title}`,
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
        <DeleteModal forceAction={forceDeleteExamAction} softAction={softDeleteExamAction} deletedId={exam.id} asChild>
          <Btn asChild icon={Trash} variant="destructive">
            Delete Exam
          </Btn>
        </DeleteModal>
        <LinkBtn href={adminRoutes.examQuestions(examId)} variant="blue">
          View Questions
        </LinkBtn>
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
