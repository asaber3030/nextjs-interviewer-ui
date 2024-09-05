"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CareerSchema, LevelSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import { Career, Level } from "@prisma/client"

import { updateLevelAction } from "@/actions/levels"
import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

type Props = {
  level: Level
  careers: Career[]
}

export function UpdateLevelModal({ level, careers }: Props) {
  const form = useForm({
    resolver: zodResolver(CareerSchema.update),
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof LevelSchema.update> }) => updateLevelAction(level.id, data),
    onSuccess: (data) => (data?.status === responseCodes.ok ? toast.success(data.message) : toast.error(data.message)),
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: {
        ...form.getValues(),
        careerId: form.getValues("careerId") ?? careers[0].id,
      },
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
          <DialogTitle>Update Level</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField defaultValue={level.name} control={form.control} name="name" label="Category Name" />
            <InputField defaultValue={level.description} control={form.control} name="description" label="Description" isTextarea />
            <SelectField control={form.control} name="careerId" label="Career" defaultValue={String(level.careerId)}>
              {careers.map((career) => (
                <SelectItem key={`career-select-item-update-${career.id}`} value={String(career.id)}>
                  {career.name}
                </SelectItem>
              ))}
            </SelectField>
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
