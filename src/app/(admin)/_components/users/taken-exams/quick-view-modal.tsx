import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDuration, formatScore } from "@/lib/utils";
import { UserExam, Exam } from "@prisma/client";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  children: React.ReactNode;
  exam: UserExam & {
    exam: Exam;
  };
};

export const TakenExamQuickViewModal = ({ children, exam }: Props) => {
  const score = (exam.totalCorrect / exam.totalQuestions) * 100;
  const totalDurationInSeconds = exam.totalDuration * 60;
  const totalQuestions = exam.totalQuestions;
  const totalCorrect = exam.totalCorrect;
  const totalWrong = exam.totalWrong;
  const averageTimePerQuestion = totalDurationInSeconds / totalQuestions;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Exam Results</DialogTitle>
          <DialogDescription>Quick overview of your exam performance</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Score</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {score.toFixed(2)}% ({totalCorrect} out of {totalQuestions})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Questions</p>
              <p className="text-2xl font-bold">{totalQuestions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Duration</p>
              <p className="text-2xl font-bold">{formatDuration(totalDurationInSeconds)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Correct Answers</p>
              <p className="text-2xl font-bold text-green-600">{totalCorrect}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-600">{totalWrong}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>Accuracy:</p>
              <p className="font-medium">{formatScore(score)}</p>
              <p>Avg. Time per Question:</p>
              <p className="font-medium">{averageTimePerQuestion}s</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Answer Breakdown</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: totalQuestions > 0 ? `${score}%` : "0%" }}
                ></div>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">{totalCorrect}</span>
              </div>
              <div className="flex items-center space-x-1">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">{totalWrong}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
