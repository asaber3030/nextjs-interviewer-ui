import { cn } from "@/lib/utils"
import { PlanFeature } from "@prisma/client"
import { Check, X } from "lucide-react"

type Props = {
  feature: PlanFeature
}

export const SingleFeatureItem = ({ feature }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4" key={feature.id}>
      <div>
        <h4 className={cn("font-medium", feature.deletedAt && "line-through")}>{feature.name}</h4>
        <p className={cn("text-muted-foreground text-sm", feature.deletedAt && "line-through")}>{feature.description}</p>
      </div>
      {!feature.deletedAt && feature.isActive ? <Check className="w-6 h-6 text-primary" /> : <X className="w-6 h-6 text-red-400" />}
    </div>
  )
}
