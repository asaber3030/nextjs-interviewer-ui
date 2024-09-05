import { getQuestion } from "@/actions/questions"
import { UpdateQuestionModal } from "@/app/(admin)/_components/exams/questions/update-question-modal"
import PageTitle from "@/app/(admin)/_components/ui/title"
import { notFound } from "next/navigation"

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
        <UpdateQuestionModal question={question} />
      </PageTitle>
    </div>
  )
}
