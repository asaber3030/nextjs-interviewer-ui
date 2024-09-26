import Link from "next/link"
import PageTitle from "@/app/(admin)/_components/ui/title"

import { AdminSingleQuestion } from "@/app/(admin)/_components/exams/questions/single-question"
import { UpdateQuestionModal } from "@/app/(admin)/_components/exams/questions/update-question-modal"
import { CreateOptionModal } from "@/app/(admin)/_components/exams/questions/question-options/create-option-modal"
import { QuestionType } from "@prisma/client"
import { QuestionAnswersTable } from "@/app/(admin)/_components/exams/questions/question-stats/question-answers-table"
import { Button } from "@/components/ui/button"

import { getQuestion } from "@/actions/questions"
import { notFound } from "next/navigation"
import { adminRoutes } from "@/lib/route"

type Props = {
  params: {
    questionId: string
  }
}

export default async function ViewQuestionIdPage({ params }: Props) {
  const questionId = +params.questionId
  const question = await getQuestion(questionId)

  if (!question) return notFound()

  const pageTitle = (
    <span>
      Question - <b>#{question.id}</b>
    </span>
  )

  return (
    <div>
      <PageTitle title={pageTitle}>
        {question.type === QuestionType.Single || (question.type === QuestionType.Multiple && <CreateOptionModal variant="outline-success" className="px-4" label="Create Option" questionId={question.id} />)}
        <UpdateQuestionModal variant="blue" className="px-4" label="Modify Question" question={question} />
        <Link href={adminRoutes.viewExam(question.examId)}>
          <Button>Update Exam</Button>
        </Link>
      </PageTitle>

      <section className="mt-4">
        <AdminSingleQuestion question={question} />
      </section>

      <section className="mt-4">
        <PageTitle title="Answers" parentClassName="mb-4">
          <Button>View All</Button>
        </PageTitle>
        <QuestionAnswersTable questionId={question.id} />
      </section>
    </div>
  )
}
