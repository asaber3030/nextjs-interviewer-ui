"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createLevelAction } from "@/actions/levels"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { LevelSchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Career } from "@prisma/client"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import { ClassValue } from "class-variance-authority/types"
import { cn, showResponseMessage } from "@/lib/utils"

type Props = {
  careers?: Career[]
  defaultCareerId?: number
  buttonClassName?: ClassValue
  label?: string
}

export function CreateLevelModal({ careers, defaultCareerId, buttonClassName, label = "Create Level" }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(LevelSchema.create),
    defaultValues: {
      name: "",
      description: "",
      careerId: defaultCareerId ? String(defaultCareerId) : String(careers?.[0]?.id),
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof LevelSchema.create> }) => createLevelAction(data),
    onSuccess: (data) => showResponseMessage(data, () => setOpen(false)),
  })

  const handleCreate = () => {
    createMutation.mutate({
      data: {
        ...form.getValues(),
        careerId: defaultCareerId ? String(defaultCareerId) : form.getValues("careerId"),
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline-success" className={cn(buttonClassName)}>
          <Plus className="size-4" /> {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Level</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <InputField control={form.control} name="name" label="Level Name" />
            <InputField control={form.control} name="description" label="Description" isTextarea />
            <SelectField control={form.control} name="careerId" label="Career">
              {careers?.map((career) => (
                <SelectItem key={`career-select-item-${career.id}`} value={String(career.id)}>
                  {career.name}
                </SelectItem>
              ))}
            </SelectField>
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
