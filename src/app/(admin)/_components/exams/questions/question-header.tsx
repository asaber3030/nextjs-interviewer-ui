import { FullQuestion } from "@/types"

type Props = {
  question: FullQuestion
}

export const AdminQuestionHeader = ({ question }: Props) => {
  return (
    <section>
      <p className="text-lg">
        <span className="font-bold">{question.order}.</span> {question.title}
      </p>
      <p className="text-sm text-gray-500 mt-2 mb-4">{question.content}</p>
    </section>
  )
}
