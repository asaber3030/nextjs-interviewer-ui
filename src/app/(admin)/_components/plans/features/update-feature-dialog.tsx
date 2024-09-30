"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { updatePlanFeatureAction } from "@/actions/plans"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { PlanFeatureSchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckboxField } from "@/components/common/checkbox-field"
import { Button } from "@/components/ui/button"
import { Cog, Edit } from "lucide-react"
import { PlanFeature } from "@prisma/client"
import { Btn } from "@/components/common/button"

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
    onSuccess: (data) => showResponseMessage(data),
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Btn size="sm" icon={Cog}>
          Update
        </Btn>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Update Plan Feature</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField defaultValue={feature.name} control={form.control} name="name" label="Feature Name" />
            <InputField defaultValue={feature.description} control={form.control} name="description" label="Description" isTextarea />
            <CheckboxField defaultValue={feature.isActive} control={form.control} name="isActive" label="Active?" />
            <DialogFooter>
              <DialogClose asChild>
                <Btn size="sm" variant="outline">
                  Close
                </Btn>
              </DialogClose>
              <LoadingButton size="sm" loading={updateMutation.isPending}>
                Update
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
