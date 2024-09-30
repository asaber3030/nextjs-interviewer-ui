import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

type Props = {
  icon: LucideIcon
  title: string
  label: string
  count: number
}

export const SinglePlanFeature = ({ label, count, title, icon: Icon }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h4 className={cn("font-medium")}>{title}</h4>
        <p className={cn("text-muted-foreground text-sm")}>
          <span className="text-orange-500 font-bold">x{count}</span> {label}
        </p>
      </div>
      <Icon className="w-6 h-6 text-primary" />
    </div>
  )
}
