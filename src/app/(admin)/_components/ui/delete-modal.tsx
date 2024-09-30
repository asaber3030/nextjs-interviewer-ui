"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { toast } from "sonner"

import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { APIResponse } from "@/types"
import { Button } from "@/components/ui/button"

interface Props {
  deletedId: number
  dialogTitle?: string
  dialogDescription?: string
  children?: React.ReactNode
  asChild?: boolean
  softAction: (id: number) => Promise<APIResponse<any, any>>
  forceAction: (id: number) => Promise<APIResponse<any, any>>
}

export const DeleteModal = ({
  deletedId,
  children,
  asChild,
  dialogTitle = "Delete Action",
  dialogDescription = "This action can be reversed later because of soft deletes but you can force delete this item.",
  forceAction,
  softAction,
}: Props) => {
  const [open, setOpen] = useState(false)

  const forceDeleteMutation = useMutation({
    mutationFn: () => forceAction(deletedId),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    },
  })
  const softDeleteMutation = useMutation({
    mutationFn: () => softAction(deletedId),
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
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="blue">
              Close
            </Button>
          </DialogClose>
          <LoadingButton size="sm" loading={softDeleteMutation.isPending} variant="outline-destructive" onClick={handleSoftDelete}>
            Delete
          </LoadingButton>
          <LoadingButton size="sm" loading={forceDeleteMutation.isPending} variant="destructive" onClick={handleForceDelete}>
            Force Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
