"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { responseCodes } from "@/lib/api"
import { createPlanFeatureAction } from "@/actions/plans"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { PlanFeatureSchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckboxField } from "@/components/common/checkbox-field"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {
  planId: number
}

export default function CreateFeatureModal({ planId }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(PlanFeatureSchema.update),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof PlanFeatureSchema.create> }) => createPlanFeatureAction(planId, data),
    onSuccess: (data) => {
      if (data?.status === responseCodes.ok) {
        toast.success(data.message)
        setOpen(false)
        form.reset()
      } else {
        toast.error(data.message)
        return
      }
    },
  })

  const handleCreate = () => {
    createMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" asChild variant="outline-success">
          <span>
            <Plus className="size-4" /> Create Feature
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <InputField control={form.control} name="name" label="Feature Name" />
            <InputField control={form.control} name="description" label="Description" isTextarea />
            <CheckboxField control={form.control} name="isActive" label="Active?" />
            <DialogFooter>
              <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
              <LoadingButton loading={createMutation.isPending} variant="outline-success">
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
