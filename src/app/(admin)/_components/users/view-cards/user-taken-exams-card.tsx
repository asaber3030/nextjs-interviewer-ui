import { Exam, UserExam } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpenIcon } from "lucide-react";

import { adminRoutes } from "@/lib/route";

import Link from "next/link";

type Props = {
  takenExams: (UserExam & { exam: Exam })[];
};

export function UserTakenExamsCard({ takenExams }: Props) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Taken Exams</CardTitle>
      </CardHeader>
      <CardContent>
        {takenExams.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-muted-foreground">No exams found.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {takenExams.map((exam) => (
              <li key={exam.id}>
                <Link
                  className="flex justify-between items-center border border-transparent px-2 py-1 text-sm hover:border-orange-200 rounded-md transition-all"
                  href={adminRoutes.viewUserTakenExam(exam.userId, exam.exam.id)}
                >
                  <span className="flex items-center">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    {exam.exam.title}
                  </span>
                  <Badge variant="outline">{Math.round(exam.totalCorrect / (exam.totalCorrect + exam.totalWrong))}%</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
