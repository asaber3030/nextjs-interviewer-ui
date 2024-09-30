import CreateFeatureModal from "./features/create-feature-dialog"

import { ArrowUp01, BriefcaseBusiness, Cog, Eye, FileQuestionIcon } from "lucide-react"
import { SingleFeatureItem } from "./features/single-feature-item"
import { SinglePlanFeature } from "./single-plan-feature"
import { LinkBtn } from "@/components/common/button"
import { Card } from "@/components/ui/card"

import { FullPlan } from "@/types"

import { adminRoutes } from "@/lib/route"

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
        <SinglePlanFeature icon={ArrowUp01} title="Number Of Levels" label="Levels" count={plan.numberOfLevels} />
        <SinglePlanFeature icon={FileQuestionIcon} title="Number Of Questions" label="Questions" count={plan.numberOfQuestions} />
        <SinglePlanFeature icon={BriefcaseBusiness} title="Number Of Positions" label="Positions" count={plan.numberOfQuestions} />
        {plan.features.map((feature) => (
          <SingleFeatureItem feature={feature} key={feature.id} />
        ))}
      </div>

      {showActions && (
        <div className="flex mt-4 gap-1">
          <LinkBtn size="sm" variant="indigo" href={adminRoutes.viewPlan(plan.id)} icon={Eye}>
            View
          </LinkBtn>
          <LinkBtn size="sm" variant="blue" href={adminRoutes.updatePlan(plan.id)} icon={Cog}>
            Update
          </LinkBtn>
          <CreateFeatureModal planId={plan.id} />
        </div>
      )}
    </Card>
  )
}
