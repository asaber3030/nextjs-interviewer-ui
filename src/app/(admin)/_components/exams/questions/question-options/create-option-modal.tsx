"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckboxField } from "@/components/common/checkbox-field"

import { QuestionOptionSchema } from "@/schema"
import { ClassValue } from "class-variance-authority/types"

import { createOptionAction } from "@/actions/options"
import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Props = {
  questionId: number
  variant?: any
  label?: string
  className?: ClassValue
}

export function CreateOptionModal({ label = "Create Option", variant = "link", className, questionId }: Props) {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(QuestionOptionSchema.create),
    defaultValues: {
      title: "",
      isCorrect: false,
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof QuestionOptionSchema.create> }) => createOptionAction(questionId, data),
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

  const handleCreate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={cn("px-0", className)}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Option</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <InputField control={form.control} name="title" label="Title" />
            <CheckboxField name="isCorrect" control={form.control} label="Is Correct" />
            <DialogFooter>
              <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
              <LoadingButton loading={updateMutation.isPending}>Create</LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
