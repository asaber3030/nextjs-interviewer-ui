"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { createCategoryAction } from "@/actions/categories"
import { toast } from "sonner"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { CategorySchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CreateCategoryModal() {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(CategorySchema.update),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof CategorySchema.create> }) => createCategoryAction(data),
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
            <Plus className="size-4" /> Create Category
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <InputField control={form.control} name="name" label="Category Name" />
            <InputField control={form.control} name="description" label="Description" isTextarea />
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
