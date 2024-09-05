"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FilePlus } from "lucide-react"
import { QuestionSchema } from "@/schema"
import { QuestionType } from "@prisma/client"

import { createQuestionAction } from "@/actions/questions"
import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

type Props = {
  examId: number
}

export function CreateQuestionModal({ examId }: Props) {
  const form = useForm({
    resolver: zodResolver(QuestionSchema.create),
    defaultValues: {
      title: "",
      content: "",
      type: QuestionType.Text,
      questionAnswer: "",
      order: 0,
      points: 0,
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof QuestionSchema.create> }) => createQuestionAction(examId, data),
    onSuccess: (data) => (data?.status === responseCodes.ok ? toast.success(data.message) : toast.error(data.message)),
  })

  const handleUpdate = () => {
    createMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <FilePlus className="size-4" />
          Create Question
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField control={form.control} name="title" label="Title" />
            <InputField control={form.control} name="content" label="Content" isTextarea />
            <InputField control={form.control} name="questionAnswer" label="Answer" />
            <SelectField name="type" label="Question Type" control={form.control}>
              <SelectItem value={QuestionType.Multiple}>Multiple Question</SelectItem>
              <SelectItem value={QuestionType.Single}>Single Choice Question</SelectItem>
              <SelectItem value={QuestionType.TF}>True & False</SelectItem>
              <SelectItem value={QuestionType.Text}>Text Field</SelectItem>
            </SelectField>
            <InputField type="number" register={form.register("points", { valueAsNumber: true })} control={form.control} name="points" label="Points" />
            <InputField type="number" register={form.register("order", { valueAsNumber: true })} control={form.control} name="order" label="Order" />
            <DialogFooter>
              <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
              <LoadingButton loading={createMutation.isPending}>Create</LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
