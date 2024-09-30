import { cn } from "@/lib/utils"
import { PlanFeature } from "@prisma/client"
import { Check, X } from "lucide-react"

type Props = {
  feature: PlanFeature
}

export const PlanFeatureCard = ({ feature }: Props) => {
  const Icon = feature.isActive ? Check : X

  return (
    <div className={cn("bg-white p-4 rounded-md shadow-sm font-medium text-sm border", feature.isActive ? "border-green-100" : "border-red-100")}>
      <section className="flex justify-between items-center">
        <p>{feature.name}</p>
        <Icon className={cn("size-4", feature.isActive ? "text-green-600" : "text-red-500")} />
      </section>
    </div>
  )
}
