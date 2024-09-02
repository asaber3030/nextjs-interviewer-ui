"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { PlanFeatureSchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { responseCodes } from "@/lib/api"
import { updatePlanFeatureAction } from "@/actions/plans"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CheckboxField } from "@/components/common/checkbox-field"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { PlanFeature } from "@prisma/client"

type Props = {
  feature: PlanFeature
}

export default function UpdateFeatureModal({ feature }: Props) {
  const form = useForm({
    resolver: zodResolver(PlanFeatureSchema.update),
    defaultValues: {},
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof PlanFeatureSchema.update> }) => updatePlanFeatureAction(feature.id, data),
    onSuccess: (data) => (data?.status === responseCodes.ok ? toast.success(data.message) : toast.error(data.message)),
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" asChild>
          <span>
            <Edit className="size-4" /> Update
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField defaultValue={feature.name} control={form.control} name="name" label="Feature Name" />
            <InputField defaultValue={feature.description} control={form.control} name="description" label="Description" isTextarea />
            <CheckboxField defaultValue={feature.isActive} control={form.control} name="isActive" label="Active?" />
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
