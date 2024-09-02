"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { FullPlan } from "@/types"
import { PlanSchema } from "@/schema"

import { responseCodes } from "@/lib/api"
import { updatePlanAction } from "@/actions/plans"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

type Props = {
  plan: FullPlan
}

export default function UpdatePlanForm({ plan }: Props) {
  const form = useForm({
    resolver: zodResolver(PlanSchema.update),
    defaultValues: {
      name: plan.name,
      description: plan.description,
      price: plan.price,
      oldPrice: plan.oldPrice,
      paymentLink: plan.paymentLink,
      numberOfLevels: plan.numberOfLevels,
      numberOfPositions: plan.numberOfPositions,
      numberOfQuestions: plan.numberOfQuestions,
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof PlanSchema.update> }) =>
      updatePlanAction(plan.id, data),
    onSuccess: (data) =>
      data?.status === responseCodes.ok
        ? toast.success(data.message)
        : toast.error(data.message),
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
        <InputField control={form.control} name="name" label="Plan Name" />
        <InputField
          control={form.control}
          name="paymentLink"
          label="Payment Link"
        />
        <InputField
          control={form.control}
          name="description"
          label="Description"
          isTextarea
        />
        <div className="grid gap-2 grid-cols-2">
          <InputField
            control={form.control}
            name="price"
            label="Price"
            register={form.register("price", { valueAsNumber: true })}
          />
          <InputField
            control={form.control}
            label="Old Price"
            name="oldPrice"
            register={form.register("oldPrice", { valueAsNumber: true })}
          />
        </div>
        <div className="grid gap-2 xl:grid-cols-3 md:grid-cols-3 grid-cols-1">
          <InputField
            control={form.control}
            name="numberOfLevels"
            label="Number Of Levels"
            register={form.register("numberOfLevels", { valueAsNumber: true })}
          />
          <InputField
            control={form.control}
            name="numberOfPositions"
            label="Number Of Positions"
            register={form.register("numberOfPositions", {
              valueAsNumber: true,
            })}
          />
          <InputField
            control={form.control}
            name="numberOfQuestions"
            label="Number Of Questions"
            register={form.register("numberOfQuestions", {
              valueAsNumber: true,
            })}
          />
        </div>

        <LoadingButton loading={updateMutation.isPending}>Update</LoadingButton>
      </form>
    </Form>
  )
}
