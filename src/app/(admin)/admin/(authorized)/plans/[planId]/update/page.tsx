import { Metadata } from "next"

import { getPlan } from "@/actions/app"
import { notFound } from "next/navigation"

import { Separator } from "@/components/ui/separator"

import PageTitle from "@/app/(admin)/_components/ui/title"
import UpdatePlanForm from "@/app/(admin)/_components/plans/update"
import AdminPlanCard from "@/app/(admin)/_components/plans/plan-card"
import DisplayPlanFeatures from "@/app/(admin)/_components/plans/plan-features"

type Props = {
  params: {
    planId: string
  }
}

export const metadata: Metadata = {
  title: "Update Plan",
}

import { DirectionURL, Directions } from "@/components/common/directions"
import { adminRoutes } from "@/lib/route"

export default async function UpdatePlanPage({ params }: Props) {
  const plan = await getPlan(+params.planId)
  if (!plan) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.plans(), label: "Plans" },
    { href: adminRoutes.viewPlan(plan.id), label: `Plan -> ${plan.name}` },
    { href: adminRoutes.updatePlan(plan.id), label: `Action -> Update`, disabled: true },
  ]

  return (
    <div>
      <PageTitle title={`Update Plan - ${plan.name} #${plan.id}`} parentClassName="mb-4" />
      <Directions urls={urls} className="my-4" />
      <div className="grid xl:grid-cols-8 grid-cols-1 md:grid-cols-6 gap-4">
        <div className="xl:col-span-5 md:col-span-4">
          <UpdatePlanForm plan={plan} />
        </div>
        <div className="xl:col-span-3 md:col-span-2">
          <AdminPlanCard plan={plan} showActions={false} />
        </div>
      </div>
      <Separator className="my-4 " />
      <PageTitle title={`Features`} parentClassName="mb-4" />
      <DisplayPlanFeatures features={plan.features} />
    </div>
  )
}
