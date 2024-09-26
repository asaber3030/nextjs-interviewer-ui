import AdminPlanCard from "@/app/(admin)/_components/plans/plan-card"
import PageTitle from "@/app/(admin)/_components/ui/title"

import { getFullPlans } from "@/actions/app"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plans",
}

export default async function PlansPage() {
  const plans = await getFullPlans()

  return (
    <div>
      <PageTitle title="Plans" parentClassName="mb-2" />
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-2">
        {plans?.map((plan) => (
          <AdminPlanCard key={`plan-${plan.id}`} plan={plan} />
        ))}
      </section>
    </div>
  )
}
