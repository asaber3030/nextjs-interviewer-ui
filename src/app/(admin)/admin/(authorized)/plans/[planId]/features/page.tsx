import db from "@/services/prisma"

import CreateFeatureModal from "@/app/(admin)/_components/plans/features/create-feature-dialog"
import PageTitle from "@/app/(admin)/_components/ui/title"
import DisplayPlanFeatures from "@/app/(admin)/_components/plans/plan-features"

import { getPlan } from "@/actions/app"
import { notFound } from "next/navigation"
import { adminRoutes } from "@/lib/route"

import { DirectionURL, Directions } from "@/components/common/directions"
import { LinkBtn } from "@/components/common/button"
import { Cog } from "lucide-react"

type Props = {
  params: {
    planId: string
  }
}

export async function generateMetadata({ params }: Props) {
  const planId = +params.planId
  const plan = await db.plan.findUnique({ where: { id: planId }, select: { name: true } })
  return {
    title: `Plan: ${plan?.name} Features`,
    description: `View features of plan ${plan?.name}`,
  }
}

const ViewPlanIdFeaturesPage = async ({ params }: Props) => {
  const planId = +params.planId
  const plan = await getPlan(planId)

  if (!plan) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.plans(), label: "Plans" },
    { href: adminRoutes.viewPlan(plan.id), label: `Plan -> ${plan.name}` },
    { href: "", label: "Features", disabled: true },
  ]

  const pageTitle = (
    <span>
      Plan <b>{plan.name}</b> - Features
    </span>
  )

  return (
    <div>
      <PageTitle title={pageTitle}>
        <LinkBtn icon={Cog} size="sm" href={adminRoutes.updatePlan(plan.id)}>
          Update
        </LinkBtn>
        <CreateFeatureModal planId={plan.id} />
      </PageTitle>
      <Directions urls={urls} className="my-4" />

      <DisplayPlanFeatures features={plan.features} />
    </div>
  )
}

export default ViewPlanIdFeaturesPage
