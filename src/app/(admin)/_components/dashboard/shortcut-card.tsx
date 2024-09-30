import { LucideIcon, Plus } from "lucide-react"
import Link from "next/link"

type Props = {
  label: string
  url: string
  icon?: LucideIcon
}

export default function ShortcutCard({ url, label, icon: Icon = Plus }: Props) {
  return (
    <Link href={url} className="flex gap-2 bg-white p-1 rounded-md shadow-sm items-center font-medium transition-colors border border-transparent hover:border-orange-200 text-sm">
      <div className="p-2 rounded-md bg-gray-100">
        <Icon className="size-4" />
      </div>
      {label}
    </Link>
  )
}
