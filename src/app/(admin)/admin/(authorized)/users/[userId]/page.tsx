import db from "@/services/prisma"

import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ChevronRightIcon, Cog } from "lucide-react"
import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { UpdateUserModal } from "@/app/(admin)/_components/users/update-user-modal"
import { UpdateUserCareerAndPlanModal } from "@/app/(admin)/_components/users/update-user-plan.tsx"
import { UpdateUserImageModal } from "@/app/(admin)/_components/users/update-user-image-modal"
import { UserSubscriptionsCard } from "@/app/(admin)/_components/users/view-cards/user-subscriptions-card"
import { UserDetailsCard } from "@/app/(admin)/_components/users/view-cards/user-details-card"
import { UserTakenExamsCard } from "@/app/(admin)/_components/users/view-cards/user-taken-exams-card"
import { UserCareerCard } from "@/app/(admin)/_components/users/view-cards/user-career-card"
import { UserActionsCard } from "@/app/(admin)/_components/users/view-cards/user-actions-card"
import { UserSubscriptionsTable } from "@/app/(admin)/_components/subscriptions/subscriptions-table"

import { notFound } from "next/navigation"
import { adminRoutes } from "@/lib/route"
import { UserMessagesCard } from "@/app/(admin)/_components/users/view-cards/user-messages-card"
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title"
import { UserActionsDropdown } from "@/app/(admin)/_components/users/actions-dropdown"
import { DirectionURL, Directions } from "@/components/common/directions"

type Props = {
  params: { userId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await db.user.findUnique({ where: { id: parseInt(params.userId) } })
  return {
    title: `@${user?.username} - View`,
  }
}

export default async function ViewUserIdPage({ params }: Props) {
  const userId = parseInt(params.userId)
  const user = await db.user.findUnique({ where: { id: userId }, include: { career: true } })

  const messages = await db.userMessage.findMany({ where: { userId }, take: 3 })
  const careers = await db.career.findMany()
  const plans = await db.plan.findMany()
  const subscriptions = await db.subscription.findMany({ where: { userId }, take: 3, include: { plan: { include: { features: true } } } })
  const takenExams = await db.userExam.findMany({ where: { userId }, take: 3, include: { exam: true } })

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.users(), label: `@${user?.username}`, disabled: true },
  ]

  if (!user) return notFound()

  return (
    <div>
      <PageTitle title={<UserPageTitle user={user} />} parentClassName="mb-4">
        <UpdateUserModal user={user} />
        <UpdateUserCareerAndPlanModal user={user} careers={careers} plans={plans}>
          <Button size="sm" variant="outline" className="bg-white">
            <Cog className="size-4" />
            Update Plan & Career
          </Button>
        </UpdateUserCareerAndPlanModal>
        <UpdateUserImageModal userId={user.id} />
        <UserActionsDropdown user={user} />
      </PageTitle>

      <Directions urls={urls} className="mb-4" />

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-2">
        <div className="h-fit space-y-2">
          <UserDetailsCard user={user} />
          <UserSubscriptionsCard subscriptions={subscriptions} />
        </div>

        <div className="h-fit space-y-2">
          <UserTakenExamsCard takenExams={takenExams} />
          <UserCareerCard career={user.career} />
          <UserMessagesCard userId={user.id} messages={messages} />
        </div>

        <div className="h-fit space-y-2">
          <UserActionsCard user={user} />
        </div>
      </div>

      <Separator className="my-4" />

      <PageTitle title="Subscriptions History" parentClassName="mb-4">
        <Link href={adminRoutes.userSubscriptions(user.id)}>
          <Button variant="indigo" size="sm">
            All Subscriptions
            <ChevronRightIcon className="size-4" />
          </Button>
        </Link>
      </PageTitle>

      <UserSubscriptionsTable subscriptions={subscriptions} user={user} />
    </div>
  )
}
