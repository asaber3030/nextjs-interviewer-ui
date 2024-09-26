import db from "@/services/prisma"

import Image from "next/image"
import Link from "next/link"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NoDataAlert } from "../../../ui/no-data"

type Props = {
  questionId: number
}

export const QuestionAnswersTable = async ({ questionId }: Props) => {
  const answers = await db.examAnswer.findMany({
    where: {
      examQuestionId: questionId,
    },
    include: { user: { select: { name: true, id: true, username: true } } },
  })

  if (answers.length === 0) return <NoDataAlert title="No answers." />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Answer ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Answered</TableHead>
          <TableHead>Is Correct</TableHead>
          <TableHead>Gained Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {answers?.map((answer) => (
          <TableRow key={`answer-${answer.id}`}>
            <TableCell>{answer.id}</TableCell>
            <TableCell>
              <Link className="flex gap-2" href={""}>
                <Image src="/images/defaults/login.svg" alt="User image" width={40} height={40} />
                <section>
                  <p className="text-sm">{answer.user.name}</p>
                  <p className="text-xs text-gray-500">@{answer.user.username}</p>
                </section>
              </Link>
            </TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
