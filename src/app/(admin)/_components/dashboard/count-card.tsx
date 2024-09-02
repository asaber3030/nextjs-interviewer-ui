import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import { LucideIcon } from "lucide-react"

import Link from "next/link"

type Props = {
  label: string
  num: number
  icon: LucideIcon
  url?: string
  color?: ClassValue
}

export default function CountCard({
  label,
  num,
  url,
  icon: Icon,
  color = "text-teal-500",
}: Props) {
  const Tag = url ? Link : "div"
  return (
    <Tag
      href={url as string}
      className={cn(
        "bg-white shadow-sm rounded-md flex gap-4 p-4 justify-between transition border border-transparent",
        url && "hover:border-orange-200"
      )}
    >
      <div>
        <p className="font-semibold xl:text-lg md:text-lg text-sm">{label}</p>
        <p className="font-medium text-gray-500">{num ?? 0}</p>
      </div>
      <Icon className={cn(color)} />
    </Tag>
  )
}
