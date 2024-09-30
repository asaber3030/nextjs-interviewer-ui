"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { toast } from "sonner"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { Button } from "@/components/ui/button"

import { APIResponse } from "@/types"

type Props = {
  id: number
  children: React.ReactNode
  dialogTitle?: string
  dialogDescription?: string
  asChild?: boolean
  action: (id: number) => Promise<APIResponse<any, any>>
}

export const ForceDeleteModal = ({
  id,
  asChild,
  children,
  dialogTitle = "Delete Action",
  dialogDescription = "This action can be reversed later because of soft deletes but you can force delete this item.",
  action,
}: Props) => {
  const [open, setOpen] = useState(false)

  const deleteMutation = useMutation({
    mutationFn: () => action(id),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    },
  })
  const handleDelete = () => {
    deleteMutation.mutate()
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
          <LoadingButton size="sm" loading={deleteMutation.isPending} variant="destructive" onClick={handleDelete}>
            Force Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
