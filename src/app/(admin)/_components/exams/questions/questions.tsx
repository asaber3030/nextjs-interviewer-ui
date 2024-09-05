import { AdminSingleQuestion } from "./single-question"
import { ExamQuestion, ExamQuestionOption } from "@prisma/client"
import { NoDataAlert } from "../../ui/no-data"

type Props = {
  questions: (ExamQuestion & { options: ExamQuestionOption[] })[]
}

export const AdminExamQuestionsList = ({ questions }: Props) => {
  if (questions.length === 0) return <NoDataAlert title="No questions." />

  return (
    <div className="space-y-2">
      {questions.map((question) => (
        <AdminSingleQuestion key={`question-${question.id}`} question={question} />
      ))}
    </div>
  )
}
