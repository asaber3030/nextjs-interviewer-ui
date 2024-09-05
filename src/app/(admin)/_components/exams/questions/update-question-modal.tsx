"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { QuestionSchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FullQuestion } from "@/types"

import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { updateQuestionAction } from "@/actions/questions"

type Props = {
  question: FullQuestion
}

export function UpdateQuestionModal({ question }: Props) {
  const form = useForm({
    resolver: zodResolver(QuestionSchema.update),
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof QuestionSchema.update> }) => updateQuestionAction(question.id, data),
    onSuccess: (data) => (data?.status === responseCodes.ok ? toast.success(data.message) : toast.error(data.message)),
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0">
          Modify
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Update Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField defaultValue={question.title} control={form.control} name="title" label="Title" />
            <InputField defaultValue={question.content} control={form.control} name="content" label="Content" isTextarea />
            <InputField defaultValue={question.questionAnswer} control={form.control} name="questionAnswer" label="Answer" />
            <InputField type="number" register={form.register("points", { valueAsNumber: true })} defaultValue={question.points} control={form.control} name="points" label="Points" />
            <InputField type="number" register={form.register("order", { valueAsNumber: true })} defaultValue={question.order} control={form.control} name="order" label="Order" />

            <DialogFooter>
              <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
              <LoadingButton loading={updateMutation.isPending}>Update</LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
