import { FullQuestion } from "@/types"
import { QuestionType } from "@prisma/client"
import { AdminTextQuestion } from "./question-types/text-question"
import { AdminMultipleQuestion } from "./question-types/multiple-choice-question"
import { AdminTFQuestion } from "./question-types/tf-question"
import { AdminSingleChoiceQuestion } from "./question-types/single-choice-question"

type Props = {
  question: FullQuestion
}

export const AdminSingleQuestion = ({ question }: Props) => {
  switch (question.type) {
    case QuestionType.Text:
      return <AdminTextQuestion question={question} />

    case QuestionType.TF:
      return <AdminTFQuestion question={question} />

    case QuestionType.Single:
      return <AdminSingleChoiceQuestion question={question} />

    case QuestionType.Multiple:
      return <AdminMultipleQuestion question={question} />
  }
}
