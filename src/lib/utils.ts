import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
import { SearchParams } from "@/types"
import { ZodError } from "zod"

import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function msg(message: string | undefined, status: number | undefined) {
  toast.error(message)
}

export function formatNumber(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "lll") {
  return moment(date).format(format)
}

export function generateArray(length: number) {
  return Array.from({ length })
}

export function extractToken(headers: string) {
  return headers.split(" ")[1]
}

export function extractErrors(errors: ZodError) {
  return errors.flatten().fieldErrors
}

export function randomHexColorCode() {
  let colors = ["bg-red-500", "bg-blue-500", "bg-teal-500", "bg-green-500", "bg-yellow-500", "bg-gray", "bg-orange-500"]
  return colors[Math.floor(Math.random() * 6)]
}

export function createPagination(params: SearchParams, skipLimit: boolean = false) {
  const numPage = Number(params.page)
  const page = isNaN(numPage) ? 1 : numPage
  const take = params.take ? +params.take : 10

  const orderBy = params.orderBy ?? "id"
  const orderType = params.orderType ?? "desc"

  let skip = (page - 1) * (skipLimit ? 0 : take)
  let nextSkip = page * (skipLimit ? 0 : take)

  return {
    orderBy: orderBy as string,
    orderType: orderType as string,
    skip,
    nextSkip,
    take,
    page,
  }
}
