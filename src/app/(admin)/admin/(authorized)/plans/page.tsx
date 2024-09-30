import AdminPlanCard from "@/app/(admin)/_components/plans/plan-card"
import PageTitle from "@/app/(admin)/_components/ui/title"

import { getFullPlans } from "@/actions/app"

import { Metadata } from "next"
import { DirectionURL, Directions } from "@/components/common/directions"
import { adminRoutes } from "@/lib/route"

export const metadata: Metadata = {
  title: "Plans",
}

export default async function PlansPage() {
  const plans = await getFullPlans()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.plans(), label: "Plans", disabled: true },
  ]

  return (
    <div>
      <PageTitle title="Plans" parentClassName="mb-2" />
      <Directions urls={urls} className="my-4" />

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-2">
        {plans?.map((plan) => (
          <AdminPlanCard key={`plan-${plan.id}`} plan={plan} />
        ))}
      </section>
    </div>
  )
}
