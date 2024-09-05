import Image from "next/image"
import Link from "next/link"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { AdminQuestionImage } from "../question-image"
import { AdminQuestionHeader } from "../question-header"
import { UpdateQuestionModal } from "../update-question-modal"
import { ForceDeleteModal } from "../../../ui/force-delete-modal"

import { ClassValue } from "class-variance-authority/types"
import { FullQuestion } from "@/types"

import { forceDeleteQuestionAction } from "@/actions/questions"
import { adminRoutes } from "@/lib/route"
import { cn } from "@/lib/utils"

type Props = {
  question: FullQuestion
}
export const AdminTFQuestion = ({ question }: Props) => {
  return (
    <div className="border p-2 rounded-md px-4 bg-white space-y-2 relative">
      <AdminQuestionHeader question={question} />
      <AdminQuestionImage image={question.image} />

      <section>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2 bg-gray-50 border rounded-md p-2">
            <RadioGroupItem value="true" id={`question-tf-${question.id}-true`} />
            <Label htmlFor={`question-tf-${question.id}-true`}>True</Label>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 border rounded-md p-2">
            <RadioGroupItem value="false" id={`question-tf-${question.id}-false`} />
            <Label htmlFor={`question-tf-${question.id}-false`}>False</Label>
          </div>
        </RadioGroup>
      </section>

      <section className="flex justify-between items-center">
        <div className="flex gap-2">
          <AdminTFQuestionPreview question={question} />
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

export const AdminTFQuestionPreview = ({ question, className }: PreviewProps) => {
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
            <Image alt="Question image" loading="lazy" src={question.image} width={400} height={400} />
          </section>
        )}

        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2 bg-gray-50 border rounded-md p-2">
            <RadioGroupItem value="true" id={`question-tf-${question.id}-true`} />
            <Label htmlFor={`question-tf-${question.id}-true`}>True</Label>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 border rounded-md p-2">
            <RadioGroupItem value="false" id={`question-tf-${question.id}-false`} />
            <Label htmlFor={`question-tf-${question.id}-false`}>False</Label>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  )
}
