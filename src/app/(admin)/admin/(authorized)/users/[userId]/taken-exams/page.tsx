import db from "@/services/prisma";
import moment from "moment";

import PageTitle from "@/app/(admin)/_components/ui/title";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SendUserMessageModal } from "@/app/(admin)/_components/users/messages/send-message-modal";
import { Button } from "@/components/ui/button";

import { Metadata } from "next";
import { SearchParams } from "@/types";
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title";

import { notFound } from "next/navigation";
import { createPagination } from "@/lib/utils";
import Link from "next/link";
import { adminRoutes } from "@/lib/route";
import { Trash } from "lucide-react";
import { TakenExamAvailableActionsDropdown } from "@/app/(admin)/_components/users/taken-exams/available-actions";
import { TakenExamQuickViewModal } from "@/app/(admin)/_components/users/taken-exams/quick-view-modal";

type Props = {
  params: { userId: string };
  searchParams: SearchParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await db.user.findUnique({ where: { id: parseInt(params.userId) }, select: { username: true } });
  return {
    title: `@${user?.username} - Taken Exams`,
  };
}

export default async function ViewUserIdTakenExamsPage({ params, searchParams }: Props) {
  const userId = parseInt(params.userId);
  const user = await db.user.findUnique({ where: { id: userId } });

  const { orderBy, orderType, skip, take, page } = createPagination(searchParams);

  const totalExams = await db.userExam.count({ where: { userId } });
  const totalPages = Math.ceil(totalExams / take ?? 10);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const takenExams = await db.userExam.findMany({
    where: { userId },
    include: { exam: true },
    orderBy: { [orderBy]: orderType },
    take,
    skip,
  });

  if (!user) return notFound();

  return (
    <div>
      <PageTitle
        title={<UserPageTitle user={user} />}
        parentClassName="mb-4"
      >
        <SendUserMessageModal user={user}>
          <Button
            variant="indigo"
            size="sm"
          >
            Send Message
          </Button>
        </SendUserMessageModal>
      </PageTitle>

      <PageTitle
        parentClassName="my-2"
        title={"Taken Exams"}
      />

      {takenExams.length === 0 ? (
        <div className="text-center text-muted-foreground">No taken exams found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Started at</TableHead>
              <TableHead>Ended at</TableHead>
              <TableHead>Total Questions</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Total Duration</TableHead>
              <TableHead className="w-20">Exam</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {takenExams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>#{exam.id}</TableCell>
                <TableCell>{moment(exam.startedAt).format("DD MMM, YYYY - HH:mm:ss")}</TableCell>
                <TableCell>{moment(exam.endedAt).format("DD MMM, YYYY - HH:mm:ss")}</TableCell>
                <TableCell>{exam.totalQuestions}</TableCell>
                <TableCell>{((exam.totalCorrect / exam.totalQuestions) * 100).toFixed(2)}%</TableCell>
                <TableCell>{exam.totalDuration} Mins</TableCell>
                <TableCell>
                  <Link
                    className="underline text-blue-500 line-clamp-1"
                    href={adminRoutes.viewExam(exam.examId)}
                  >
                    #{exam.exam.id} - {exam.exam.title}
                  </Link>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <TakenExamQuickViewModal exam={exam}>
                    <Button size="sm">Quick View</Button>
                  </TakenExamQuickViewModal>
                  <TakenExamAvailableActionsDropdown exam={exam} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
