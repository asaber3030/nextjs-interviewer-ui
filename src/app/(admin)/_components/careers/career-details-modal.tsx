"use client"

import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScanEye } from "lucide-react"
import { Career } from "@prisma/client"

type Props = {
  career: Career
}

export function CareerDetailsModal({ career }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" asChild variant="outline-success">
          <span>
            <ScanEye className="size-4" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white xl:min-w-[700px] md:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            Career Details - <b>{career.name}</b>
          </DialogTitle>
          <DialogDescription>{career.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
