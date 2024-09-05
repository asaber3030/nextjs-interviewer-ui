import { Exam } from "@prisma/client"
import { Separator } from "@/components/ui/separator"

import { adminRoutes } from "@/lib/route"

import Link from "next/link"
import db from "@/services/prisma"

type Props = {
  exam: Exam
}

export const AdminExamCard = async ({ exam }: Props) => {
  const outlines = await db.examOutline.findMany({ where: { examId: exam.id } })
  const counts = {
    answers: await db.examAnswer.count({ where: { examId: exam.id } }),
    userExams: await db.userExam.count({ where: { examId: exam.id } }),
  }
  const career = await db.career.findUnique({
    where: { id: exam.careerId },
    select: { name: true, category: { select: { id: true, name: true } } },
  })
  const level = await db.level.findUnique({
    where: { id: exam.levelId },
    select: { name: true },
  })

  return (
    <div className="bg-white h-fit rounded-sm shadow-sm border transition-all hover:scale-105 p-4">
      <section className="text-center space-y-4">
        <Link href={adminRoutes.viewExam(exam.id)} className="font-serif font-semibold text-xl hover:underline hover:text-blue-600">
          {exam.title}
        </Link>
        <p className="text-sm text-gray-500">{exam.description}</p>
      </section>

      <Separator className="my-4" />

      {outlines.length > 0 && (
        <div>
          <h4 className="mb-2 font-semibold">Outlines</h4>
          <ul className="list-decimal pl-4">
            {outlines.map((o) => (
              <li className="text-sm text-gray-500 py-1" key={o.id}>
                {o.title}
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
        </div>
      )}

      <ul className="space-y-2">
        <li className="flex justify-between items-center text-sm">
          <span>Number Of Questions</span> <span className="font-semibold">{exam.totalQuestions} question(s)</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>Duration</span> <span className="font-semibold">{exam.duration} mins</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>Taken</span> <span className="font-semibold">{counts.userExams} taken times</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>Answers</span> <span className="font-semibold">{counts.answers} answer(s)</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>Category</span>
          <Link href="" className="font-semibold text-blue-600 hover:underline">
            {career?.category.name}
          </Link>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>Career</span>
          <Link href="" className="font-semibold text-blue-600 hover:underline">
            {career?.name}
          </Link>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>Level</span>
          <Link href="" className="font-semibold text-blue-600 hover:underline">
            {level?.name}
          </Link>
        </li>
      </ul>
    </div>
  )
}
