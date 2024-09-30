import { ClassValue } from "class-variance-authority/types"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"

type Props = {
  className?: ClassValue
}
export const InputSkeleton = ({ className }: Props) => {
  return <Skeleton className={cn("w-full h-10 rounded-md", className)} />
}
