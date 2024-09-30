import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

import Link from "next/link"

type QuickLinkProps = {
  icon: LucideIcon
  href: string
  label: string
  count: number
}

export const QuickLink = ({ href, icon: Icon, label, count }: QuickLinkProps) => {
  return (
    <Link href={href} className="bg-white shadow-sm p-2 px-4 font-medium rounded-md flex items-center justify-between border transition-colors gap-2 hover:border-orange-200">
      <div className="flex gap-2 items-center">
        <Icon className="size-4" /> {label}
      </div>
      {count != 0 && <Badge variant="blue">{count}</Badge>}
    </Link>
  )
}
