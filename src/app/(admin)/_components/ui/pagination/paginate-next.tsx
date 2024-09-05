"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { ClassValue } from "class-variance-authority/types"
import { ArrowRight } from "lucide-react"

type Props = {
  className?: ClassValue
  disabled?: boolean
}

export const PaginateNext = ({ disabled, className }: Props) => {
  const params = useSearchParams()
  const router = useRouter()
  const pageParam = params.get("page")
  const pageNumber = Number(pageParam)
  const verifyNaN = isNaN(pageNumber)
  const page = !verifyNaN ? pageNumber : 2

  return (
    <Button variant="outline" className={cn(className)} disabled={disabled} onClick={() => router.push(`?page=${!page ? 2 : page + 1}`)}>
      Next
      <ArrowRight className="size-4 text-secondaryMain" />
    </Button>
  )
}
