"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { APIResponse } from "@/types"
import { showResponseMessage } from "@/lib/utils"

interface Props extends ButtonProps {
  deletedId: number
  children: React.ReactNode
  asChild?: boolean
  title?: string
  description?: string
  action: (id: number) => Promise<APIResponse<any, any>>
}

export const RestoreModal = ({ children, asChild, deletedId, title = "Restore Action", description = "Once you restore this item users will be able to use it again.", action }: Props) => {
  const [open, setOpen] = useState(false)

  const restoreMutation = useMutation({
    mutationFn: () => action(deletedId),
    onSuccess: (data) => showResponseMessage(data, () => setOpen(false)),
  })

  const handleRestore = () => {
    restoreMutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Close
            </Button>
          </DialogClose>
          <LoadingButton size="sm" loading={restoreMutation.isPending} variant="outline-blue" onClick={handleRestore}>
            Restore
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
