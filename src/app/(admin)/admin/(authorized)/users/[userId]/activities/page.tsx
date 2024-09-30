import db from "@/services/prisma"
import moment from "moment"

import PageTitle from "@/app/(admin)/_components/ui/title"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SendUserMessageModal } from "@/app/(admin)/_components/users/messages/send-message-modal"
import { Button } from "@/components/ui/button"

import { Metadata } from "next"
import { SearchParams } from "@/types"
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title"

import { notFound } from "next/navigation"
import { DirectionURL, Directions } from "@/components/common/directions"
import { adminRoutes } from "@/lib/route"

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await db.user.findUnique({ where: { id: parseInt(params.userId) }, select: { username: true } })
  return {
    title: `@${user?.username} - Activities`,
  }
}

export default async function ViewUserIdActivitiesPage({ params }: Props) {
  const userId = parseInt(params.userId)
  const user = await db.user.findUnique({ where: { id: userId } })

  const activities = await db.userActivity.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  })
  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.viewUser(userId), label: `@${user?.username}` },
    { href: adminRoutes.userActivities(userId), label: "Activities", disabled: true },
  ]

  if (!user) return notFound()

  return (
    <div>
      <PageTitle title={<UserPageTitle user={user} />} parentClassName="mb-4">
        <SendUserMessageModal user={user}>
          <Button variant="indigo" size="sm">
            Send Message
          </Button>
        </SendUserMessageModal>
      </PageTitle>

      <Directions urls={urls} className="mb-4" />

      {activities.length === 0 ? (
        <div className="text-center text-muted-foreground">No activities found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.title}</TableCell>
                <TableCell>{moment(activity.createdAt).fromNow()}</TableCell>
                <TableCell>{activity.client}</TableCell>
                <TableCell>{activity.device}</TableCell>
                <TableCell className="font-medium">{activity.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
