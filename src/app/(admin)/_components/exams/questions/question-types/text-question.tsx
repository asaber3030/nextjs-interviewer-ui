import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminQuestionHeader } from "../question-header"
import { AdminQuestionImage } from "../question-image"
import { UpdateQuestionModal } from "../update-question-modal"
import { ForceDeleteModal } from "../../../ui/force-delete-modal"

import { FullQuestion } from "@/types"
import { ClassValue } from "class-variance-authority/types"

import { forceDeleteQuestionAction } from "@/actions/questions"
import { adminRoutes } from "@/lib/route"
import { cn } from "@/lib/utils"

type Props = {
  question: FullQuestion
}

export const AdminTextQuestion = ({ question }: Props) => {
  return (
    <div className="border p-2 rounded-md bg-white px-4 space-y-2 relative">
      <AdminQuestionHeader question={question} />
      <AdminQuestionImage image={question.image} />

      <section className="flex justify-between items-center">
        <div className="flex gap-2">
          <AdminTextQuestionPreview question={question} />
          <UpdateQuestionModal question={question} />
          <ForceDeleteModal hideIcon id={question.id} action={forceDeleteQuestionAction} />
          <Link href={adminRoutes.viewQuestion(question.examId, question.id)}>
            <Button variant="link" className="px-0">
              View Question
            </Button>
          </Link>
        </div>
        <section className="gap-1 flex items-center">
          <Badge className="font-medium text-xs gap-1" variant="outline">
            Answer: <b className="text-green-600 font-semibold">{question.questionAnswer}</b>
          </Badge>
        </section>
      </section>
    </div>
  )
}

interface PreviewProps extends Props {
  className?: ClassValue
}

export const AdminTextQuestionPreview = ({ question, className }: PreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className={cn("px-0", className)}>
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white xl:min-w-[800px] md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            <span className="font-bold">{question.order}.</span> {question.title}
          </DialogTitle>
          <DialogDescription>{question.content}</DialogDescription>
        </DialogHeader>

        {question.image && (
          <section>
            <Image alt="question image" loading="lazy" src={question.image} width={400} height={400} />
          </section>
        )}

        <section>
          <p className="mb-1 text-lg font-semibold">Answer:</p>
          <Input placeholder="Your answer" />
        </section>
      </DialogContent>
    </Dialog>
  )
}
