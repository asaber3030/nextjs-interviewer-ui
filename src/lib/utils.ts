import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
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
