import db from "@/services/prisma"

import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"

import { adminRoutes } from "@/lib/route"
import { notFound } from "next/navigation"

import { AdminExamCard } from "@/app/(admin)/_components/exams/exam-card"
import { AdminExamQuestionsList } from "@/app/(admin)/_components/exams/questions/questions"
import { CreateQuestionModal } from "@/app/(admin)/_components/exams/questions/create-question-modal"
import { Button } from "@/components/ui/button"
import { Cog } from "lucide-react"

type Props = {
  params: {
    examId: string
  }
}

export async function generateMetadata({ params }: Props) {
  const examId = +params.examId
  const exam = await db.exam.findUnique({ where: { id: examId }, select: { title: true } })

  return {
    title: `Exam Questions - ${exam?.title}`,
  }
}

export default async function ExamIdQuestions({ params }: Props) {
  const examId = +params.examId
  const exam = await db.exam.findUnique({ where: { id: examId } })
  const questions = await db.examQuestion.findMany({
    where: { examId },
    include: { options: true },
    orderBy: { order: "asc" },
  })

  if (!exam) return notFound()

  const pageTitle = (
    <span>
      Exam Question - <b>#{exam.id}</b>
    </span>
  )

  return (
    <div>
      <PageTitle title={pageTitle} parentClassName="mb-2 pb-2">
        <CreateQuestionModal examId={exam.id} />
        <Link href={adminRoutes.viewExam(exam.id)}>
          <Button variant="blue">
            <Cog className="size-4" /> Update Exam
          </Button>
        </Link>
      </PageTitle>
      <div className="grid xl:grid-cols-8 grid-cols-1 gap-4">
        <section className="col-span-5">
          <PageTitle title="Questions" parentClassName="mb-4" />
          <AdminExamQuestionsList questions={questions} />
        </section>
        <section className="col-span-3">
          <PageTitle title="Exam Details" parentClassName="mb-4" />
          <AdminExamCard exam={exam} />
        </section>
      </div>
    </div>
  )
}
