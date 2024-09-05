import Image from "next/image"
import Link from "next/link"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { AdminQuestionHeader } from "../question-header"
import { AdminQuestionImage } from "../question-image"
import { UpdateQuestionModal } from "../update-question-modal"
import { UpdateOptionModal } from "../question-options/update-option-modal"
import { ForceDeleteModal } from "../../../ui/force-delete-modal"
import { CreateOptionModal } from "../question-options/create-option-modal"

import { FullQuestion } from "@/types"
import { ClassValue } from "class-variance-authority/types"

import { forceDeleteOptionAction } from "@/actions/options"
import { forceDeleteQuestionAction } from "@/actions/questions"
import { cn } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"

type Props = {
  question: FullQuestion
}

export const AdminSingleChoiceQuestion = ({ question }: Props) => {
  return (
    <div className="border p-2 rounded-md px-4 bg-white space-y-2 relative">
      <AdminQuestionHeader question={question} />
      <AdminQuestionImage image={question.image} />

      <section>
        <RadioGroup>
          {question.options.map((option) => (
            <div key={`option-${option.id}`} className="flex justify-between items-center space-x-2 bg-gray-50 border rounded-md px-4">
              <div className="w-full space-x-2 flex items-center">
                <RadioGroupItem value={option.title} id={`question-single-${option.id}`} />
                <Label htmlFor={`question-single-${option.id}`}>{option.title}</Label>
              </div>
              <div className="flex gap-4">
                <UpdateOptionModal option={option} />
                <ForceDeleteModal action={forceDeleteOptionAction} id={option.id} className="p-0 text-gray-600 gap-0.5" />
              </div>
            </div>
          ))}
        </RadioGroup>
      </section>

      <section className="flex justify-between items-center">
        <div className="flex gap-2">
          <AdminSingleChoiceQuestionPreview question={question} />
          <CreateOptionModal questionId={question.id} />
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

export const AdminSingleChoiceQuestionPreview = ({ question, className }: PreviewProps) => {
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
          {question.options.map((option) => (
            <div className="flex items-center space-x-2 bg-gray-50 border rounded-md p-2" key={`option-${option.id}`}>
              <RadioGroupItem value={option.title} id={`question-tf-${question.id}-true`} />
              <Label htmlFor={`question-tf-${question.id}-true`}>{option.title}</Label>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  )
}
