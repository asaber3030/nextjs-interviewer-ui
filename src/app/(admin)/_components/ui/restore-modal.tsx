"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { toast } from "sonner"

import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash, Undo } from "lucide-react"
import { APIResponse } from "@/types"

type Props = {
  title?: string
  id: number
  action: (id: number) => Promise<APIResponse<any, any>>
}

export const RestoreModal = ({ id, action, title = "Restore Action" }: Props) => {
  const [open, setOpen] = useState(false)

  const restoreMutation = useMutation({
    mutationFn: () => action(id),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    },
  })

  const handleRestore = () => {
    restoreMutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" variant="outline-blue" asChild>
          <span className="flex gap-2 items-center">
            <Undo className="size-4" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
          <LoadingButton loading={restoreMutation.isPending} variant="outline-blue" onClick={handleRestore}>
            Restore
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
