import db from "@/services/prisma"

import CreateFeatureModal from "@/app/(admin)/_components/plans/features/create-feature-dialog"
import PageTitle from "@/app/(admin)/_components/ui/title"

import { getPlan } from "@/actions/app"
import { notFound } from "next/navigation"
import { adminRoutes } from "@/lib/route"

import { DirectionURL, Directions } from "@/components/common/directions"
import { LinkBtn } from "@/components/common/button"
import { CheckCheck, Cog, DollarSign, Users } from "lucide-react"
import { QuickLink } from "@/app/(admin)/_components/plans/view/quick-link"
import { LatestSubscriptionCard } from "@/app/(admin)/_components/plans/view/subscription-card"
import { PlanFeatureCard } from "@/app/(admin)/_components/plans/view/feature-card"
import { LatestPlanUsersTable } from "@/app/(admin)/_components/plans/view/latest-users-table"

type Props = {
  params: {
    planId: string
  }
}

export async function generateMetadata({ params }: Props) {
  const planId = +params.planId
  const plan = await getPlan(planId)
  return {
    title: `Plan: ${plan?.name}`,
    description: `View details of plan ${plan?.name}`,
  }
}

const ViewPlanIdPage = async ({ params }: Props) => {
  const planId = +params.planId
  const plan = await getPlan(planId)

  if (!plan) return notFound()

  const countSubscriptions = await db.subscription.count({ where: { planId: planId } })
  const countUsers = await db.user.count({ where: { planId: planId } })
  const countFeatures = await db.planFeature.count({ where: { planId: planId } })

  const latestSubscriptions = await db.subscription.findMany({
    where: { planId: planId },
    orderBy: { subscribedAt: "desc" },
    include: { user: true },
    take: 5,
  })

  const planFeatures = await db.planFeature.findMany({
    where: { planId: planId },
    orderBy: { id: "desc" },
  })

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.plans(), label: "Plans" },
    { href: adminRoutes.viewPlan(plan.id), label: `Plan -> ${plan.name}`, disabled: true },
  ]

  const pageTitle = (
    <span>
      Plan <b>{plan.name}</b>
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

      <section className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">Actions</h3>
          <section className="grid grid-cols-4 gap-2">
            <QuickLink count={0} icon={Cog} href={adminRoutes.updatePlan(plan.id)} label="Update details" />
            <QuickLink count={countSubscriptions} icon={DollarSign} href={adminRoutes.planSubscriptions(plan.id)} label="Subscriptions" />
            <QuickLink count={countFeatures} icon={CheckCheck} href={adminRoutes.planFeatures(plan.id)} label="Features" />
            <QuickLink count={countUsers} icon={Users} href={adminRoutes.planUsers(plan.id)} label="Users" />
          </section>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Users (Last 5)</h3>
          <LatestPlanUsersTable planId={planId} />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Latest Subscriptions</h3>
          <section className="grid grid-cols-4 gap-2">
            {latestSubscriptions.map((subscription) => (
              <LatestSubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
          </section>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Features</h3>
          <section className="grid grid-cols-4 gap-2">
            {planFeatures.map((feature) => (
              <PlanFeatureCard key={feature.id} feature={feature} />
            ))}
          </section>
        </section>
      </section>
    </div>
  )
}

export default ViewPlanIdPage
