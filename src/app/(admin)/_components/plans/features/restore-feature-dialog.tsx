"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { restorePlanFeatureAction } from "@/actions/plans"
import { toast } from "sonner"

import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

type Props = {
  featureId: number
}

const RestoreFeatureModal = ({ featureId }: Props) => {
  const [open, setOpen] = useState(false)

  const restoreMutation = useMutation({
    mutationFn: () => restorePlanFeatureAction(featureId),
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
            <Trash className="size-4" /> Restore
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action can be reversed later because of soft deletes but you can force delete this item.</DialogDescription>
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

export default RestoreFeatureModal
