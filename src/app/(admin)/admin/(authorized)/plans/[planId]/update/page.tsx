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

export default async function UpdatePlanPage({ params }: Props) {
  const plan = await getPlan(+params.planId)
  if (!plan) return notFound()

  return (
    <div>
      <PageTitle
        title={`Update Plan - ${plan.name} #${plan.id}`}
        parentClassName="mb-4"
      />
      <div className="grid xl:grid-cols-8 grid-cols-1 md:grid-cols-6 gap-4">
        <div className="xl:col-span-3 md:col-span-2">
          <AdminPlanCard plan={plan} showActions={false} />
        </div>
        <div className="xl:col-span-5 md:col-span-4">
          <UpdatePlanForm plan={plan} />
        </div>
      </div>
      <Separator className="my-4 " />
      <PageTitle title={`Features`} parentClassName="mb-4" />{" "}
      <DisplayPlanFeatures features={plan.features} />
    </div>
  )
}
