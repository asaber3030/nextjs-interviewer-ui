"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { createPlanFeatureAction } from "@/actions/plans"
import { zodResolver } from "@hookform/resolvers/zod"
import { showResponseMessage } from "@/lib/utils"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { CheckboxField } from "@/components/common/checkbox-field"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"

import { PlanFeatureSchema } from "@/schema"
import { Btn } from "@/components/common/button"

type Props = {
  planId: number
}

export default function CreateFeatureModal({ planId }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(PlanFeatureSchema.create),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof PlanFeatureSchema.create> }) => createPlanFeatureAction(planId, data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false)
        form.reset()
      }),
  })

  const handleCreate = () => {
    createMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Btn size="sm" variant="success" icon={Plus}>
          Create Feature
        </Btn>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <InputField control={form.control} name="name" label="Feature Name" />
            <InputField control={form.control} name="description" label="Description" isTextarea />
            <CheckboxField control={form.control} name="isActive" label="Active?" />
            <DialogFooter>
              <DialogClose asChild>
                <Btn size="sm">Close</Btn>
              </DialogClose>
              <LoadingButton size="sm" loading={createMutation.isPending} variant="success">
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
