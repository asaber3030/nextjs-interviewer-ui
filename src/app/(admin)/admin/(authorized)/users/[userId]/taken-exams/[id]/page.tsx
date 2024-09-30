import db from "@/services/prisma"
import moment from "moment"

import React from "react"
import Link from "next/link"

import { Clock, CheckCircle2, XCircle, BarChart2, Brain, Target, BarChart, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { notFound } from "next/navigation"
import { formatDuration } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"
import { DirectionURL, Directions } from "@/components/common/directions"

const examQuestions = [
  { id: 1, question: "What is the capital of France?", userAnswer: "Paris", correctAnswer: "Paris", isCorrect: true },
  { id: 2, question: "Which planet is known as the Red Planet?", userAnswer: "Mars", correctAnswer: "Mars", isCorrect: true },
  { id: 3, question: "What is the largest mammal?", userAnswer: "Elephant", correctAnswer: "Blue Whale", isCorrect: false },
]

type ExamDetailsProps = {
  params: {
    id: string
    userId: string
  }
}

export default async function ExamDetailsPage({ params }: ExamDetailsProps) {
  const userId = +params.userId
  const user = await db.user.findUnique({ where: { id: userId }, select: { username: true, id: true } })
  const takenExamId = +params.id
  const exam = await db.userExam.findUnique({
    where: {
      id: takenExamId,
    },
    include: {
      exam: {
        include: {
          career: true,
          questions: true,
        },
      },
      user: true,
    },
  })

  if (!exam) return notFound()

  const score = exam.totalQuestions > 0 ? (exam.totalCorrect / exam.totalQuestions) * 100 : 0
  const accuracy = score.toFixed(2)
  const averageTimePerQuestion = exam.totalQuestions > 0 ? ((exam.totalDuration * 60) / exam.totalQuestions).toFixed(2) : "0.00"

  if (!user) return notFound()
  if (user.id !== exam.userId) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.viewUser(user.id), label: `@${user?.username}` },
    { href: adminRoutes.userTakenExams(user.id), label: "Taken Exams" },
    { href: adminRoutes.viewUserTakenExam(user.id, exam.id), label: exam.exam.title, disabled: true },
  ]

  return (
    <div>
      <UserPageTitle user={exam.user} />

      <Directions urls={urls} className="my-4" />

      <h1 className="text-xl font-semibold my-2">
        Results of{" "}
        <Link href={adminRoutes.viewExam(exam.exam.id)} className="text-blue-500 hover:underline">
          {exam.exam.title} #{exam.examId}
        </Link>
      </h1>

      <div className="grid gap-2 md:grid-cols-3">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Exam Overview</CardTitle>
            <CardDescription>Key statistics from your exam</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Score</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${score}%` }}></div>
                </div>
                <p className="text-sm text-gray-500">
                  {score.toFixed(2)}% ({exam.totalCorrect} out of {exam.totalQuestions})
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold">{exam.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-2xl font-bold">{formatDuration(exam.totalDuration * 60)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">{exam.totalCorrect}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wrong Answers</p>
                  <p className="text-2xl font-bold text-red-600">{exam.totalWrong}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Answer Breakdown</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: exam.totalQuestions > 0 ? `${score}%` : "0%" }}></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{exam.totalCorrect}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium">{exam.totalWrong}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Detailed analysis of your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Accuracy:</span>
                <span className="ml-auto text-sm font-bold">{accuracy}%</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Avg. Time per Question:</span>
                <span className="ml-auto text-sm font-bold">{averageTimePerQuestion}s</span>
              </div>
              <div className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Knowledge Level:</span>
                <span className="ml-auto">
                  <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>{score >= 80 ? "Expert" : score >= 60 ? "Intermediate" : "Beginner"}</Badge>
                </span>
              </div>
              <div className="flex items-center">
                <BarChart2 className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Performance Trend:</span>
                <span className="ml-auto text-sm font-bold text-green-600">Improving</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Exam Information</CardTitle>
            <CardDescription>Details about the exam you took</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Exam Title</p>
                <p className="font-medium line-clamp-1">{exam.exam.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Career</p>
                <Link href={adminRoutes.viewCareer(exam.exam.career.id)} className="font-medium text-blue-500 hover:underline">
                  {exam.exam.career.name}
                </Link>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Taken</p>
                <p className="font-medium">{moment(exam.startedAt).format("DD MMM, YYYY - HH:mm")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ended At</p>
                <p className="font-medium">{moment(exam.endedAt).format("DD MMM, YYYY - HH:mm")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="font-medium">{exam.totalQuestions}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Link href={adminRoutes.viewExam(exam.exam.id)}>
              <Button variant="outline" size="sm" className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                View Exam
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex items-center">
              <BarChart className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-fit col-span-3">
          <CardHeader>
            <CardTitle>Question Analysis</CardTitle>
            <CardDescription>Detailed breakdown of each question</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[600px] pr-4">
              {examQuestions.map((q, index) => (
                <React.Fragment key={q.id}>
                  <div className="py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-bold">Question {index + 1}:</span>
                      {q.isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600 ml-2" /> : <XCircle className="w-4 h-4 text-red-600 ml-2" />}
                    </div>
                    <p className="mt-1">{q.question}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Your Answer:</span> <b>{q.userAnswer}</b>
                      </div>
                      <div>
                        <span className="font-medium">Correct Answer:</span> <b>{q.correctAnswer}</b>
                      </div>
                    </div>
                  </div>
                  {index < examQuestions.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
