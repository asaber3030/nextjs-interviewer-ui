import { FullPlan } from "@/types"
import { Check, Edit, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { adminRoutes } from "@/lib/route"

import Link from "next/link"
import { cn } from "@/lib/utils"
import CreateFeatureModal from "./features/create-feature-dialog"

type Props = {
  plan: FullPlan
  showActions?: boolean
}

export default function AdminPlanCard({ plan, showActions = true }: Props) {
  return (
    <Card className="w-full p-6 grid gap-2 h-fit">
      <div>
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <p className="text-muted-foreground text-sm mt-4">{plan.description}</p>
      </div>
      <div className="grid gap-4 h-fit mt-2">
        {plan.features.map((feature) => (
          <div className="flex items-center gap-4" key={feature.id}>
            {!feature.deletedAt && feature.isActive ? (
              <div className="grid place-content-center bg-gray-50 p-2 rounded-md border">
                <Check className="w-6 h-6 text-primary" />
              </div>
            ) : (
              <div className="grid place-content-center bg-gray-50 p-2 rounded-md border">
                <X className="w-6 h-6 text-red-400" />
              </div>
            )}
            <div>
              <h4 className={cn("font-medium", feature.deletedAt && "line-through")}>{feature.name}</h4>
              <p className={cn("text-muted-foreground text-sm", feature.deletedAt && "line-through")}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      {showActions && (
        <div className="flex justify-end mt-4 gap-1">
          <Link href={adminRoutes.updatePlan(plan.id)}>
            <Button size="sm" variant="outline-default">
              <Edit className="size-4" />
              Update
            </Button>
          </Link>
          <CreateFeatureModal planId={plan.id} />
        </div>
      )}
    </Card>
  )
}
