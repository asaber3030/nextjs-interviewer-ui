"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Form } from "@/components/ui/form"
import { CategorySchema } from "@/schema"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { Category } from "@prisma/client"

import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { updateCategoryAction } from "@/actions/categories"

type Props = {
  category: Category
}

export function UpdateCategoryModal({ category }: Props) {
  const form = useForm({
    resolver: zodResolver(CategorySchema.update),
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof CategorySchema.update> }) => updateCategoryAction(category.id, data),
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
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField defaultValue={category.name} control={form.control} name="name" label="Category Name" />
            <InputField defaultValue={category.description} control={form.control} name="description" label="Description" isTextarea />
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
