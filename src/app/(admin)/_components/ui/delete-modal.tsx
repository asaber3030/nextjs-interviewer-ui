"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { toast } from "sonner"

import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { APIResponse } from "@/types"

type Props = {
  buttonLabel?: string
  title?: string
  description?: string
  id: number
  softAction: (id: number) => Promise<APIResponse<any, any>>
  forceAction: (id: number) => Promise<APIResponse<any, any>>
}

export const DeleteModal = ({ id, buttonLabel, softAction, forceAction, title = "Delete Action", description = "This action can be reversed later because of soft deletes but you can force delete this item." }: Props) => {
  const [open, setOpen] = useState(false)

  const forceDeleteMutation = useMutation({
    mutationFn: () => forceAction(id),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    },
  })
  const softDeleteMutation = useMutation({
    mutationFn: () => softAction(id),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    },
  })

  const handleForceDelete = () => {
    forceDeleteMutation.mutate()
  }
  const handleSoftDelete = () => {
    softDeleteMutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline-destructive">
          <Trash className="size-4" />
          {buttonLabel && buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
          <LoadingButton loading={softDeleteMutation.isPending} variant="outline-destructive" onClick={handleSoftDelete}>
            Delete
          </LoadingButton>
          <LoadingButton loading={forceDeleteMutation.isPending} variant="destructive" onClick={handleForceDelete}>
            Force Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
