import db from "@/services/prisma"

import PageTitle from "@/app/(admin)/_components/ui/title"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Mail, Printer } from "lucide-react"
import { Metadata } from "next"

import { UpdateUserModal } from "@/app/(admin)/_components/users/update-user-modal"
import { SearchParams } from "@/types"
import { FilterButton } from "@/app/(admin)/_components/ui/filter/filter-button"
import { UserSubscriptionsTable } from "@/app/(admin)/_components/subscriptions/subscriptions-table"

import { notFound } from "next/navigation"
import { createPagination } from "@/lib/utils"
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title"
import { DirectionURL, Directions } from "@/components/common/directions"
import { adminRoutes } from "@/lib/route"

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await db.user.findUnique({ where: { id: parseInt(params.userId) } })
  return {
    title: `@${user?.username} - Subscriptions`,
  }
}

export default async function ViewUserIdSubscriptionsPage({ params, searchParams }: Props) {
  const userId = parseInt(params.userId)
  const user = await db.user.findUnique({ where: { id: userId }, include: { career: true } })

  const { orderBy, orderType, skip, take, page } = createPagination(searchParams)

  const totalSubscriptions = await db.subscription.count({ where: { userId } })
  const totalPages = Math.ceil(totalSubscriptions / take ?? 10)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1

  const subscriptions = await db.subscription.findMany({
    where: { userId },
    include: { plan: { include: { features: true } } },
    orderBy: { [orderBy]: orderType },
    take,
    skip,
  })

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.viewUser(userId), label: `@${user?.username}` },
    { href: adminRoutes.userSubscriptions(userId), label: "Subscriptions", disabled: true },
  ]

  if (!user) return notFound()

  return (
    <div>
      <PageTitle title={<UserPageTitle user={user} />} parentClassName="mb-4">
        <UpdateUserModal user={user} />
      </PageTitle>

      <Directions urls={urls} className="mb-4" />
      <UserSubscriptionsTable subscriptions={subscriptions} user={user} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
    </div>
  )
}
