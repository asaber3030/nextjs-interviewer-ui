"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { APIResponse } from "@/types"
import { ClassValue } from "class-variance-authority/types"
import { Trash } from "lucide-react"

type Props = {
  title?: string
  description?: string
  variant?: any
  className?: ClassValue
  hideIcon?: boolean
  id: number
  action: (id: number) => Promise<APIResponse<any, any>>
}

export const ForceDeleteModal = ({ id, className, hideIcon = false, variant, action, title = "Delete Action", description = "This action can be reversed later because of soft deletes but you can force delete this item." }: Props) => {
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
      <DialogTrigger asChild>
        <Button variant={variant ? variant : "link"} className={cn("px-0", className)}>
          {!hideIcon && <Trash className="size-4" />}
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
          <LoadingButton loading={deleteMutation.isPending} variant="destructive" onClick={handleDelete}>
            Force Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
