"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { updateOptionAction } from "@/actions/options"
import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { CheckboxField } from "@/components/common/checkbox-field"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Cog } from "lucide-react"

import { ExamQuestionOption } from "@prisma/client"
import { QuestionSchema } from "@/schema"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  option: ExamQuestionOption
  variant?: any
  label?: string
  className?: ClassValue
}

export function UpdateOptionModal({ label = "Modify", variant = "link", className, option }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(QuestionSchema.update),
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof QuestionSchema.update> }) => updateOptionAction(option.id, data),
    onSuccess: (data) => {
      if (data?.status === responseCodes.ok) {
        toast.success(data.message)
        form.reset()
        setOpen(false)
      } else {
        toast.error(data.message)
        return
      }
    },
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 text-gray-600 gap-0.5" size="sm" variant="link">
          <Cog className="size-4" />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Update Option</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField defaultValue={option.title} control={form.control} name="title" label="Title" />
            <CheckboxField name="isCorrect" control={form.control} label="Is Correct" defaultValue={option.isCorrect} />
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
