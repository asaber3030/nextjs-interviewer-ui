import db from "@/services/prisma"
import moment from "moment"

import PageTitle from "@/app/(admin)/_components/ui/title"

import { notFound } from "next/navigation"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SendUserMessageModal } from "@/app/(admin)/_components/users/messages/send-message-modal"
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title"
import { Button } from "@/components/ui/button"

import { Metadata } from "next"
import { SearchParams } from "@/types"
import { adminRoutes } from "@/lib/route"
import { DirectionURL, Directions } from "@/components/common/directions"

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await db.user.findUnique({ where: { id: parseInt(params.userId) }, select: { username: true } })
  return {
    title: `@${user?.username} - Login History`,
  }
}

export default async function ViewUserIdMessagesPage({ params }: Props) {
  const userId = parseInt(params.userId)
  const user = await db.user.findUnique({ where: { id: userId } })

  const loginHistory = await db.loginHistory.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  })

  if (!user) return notFound()

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.viewUser(userId), label: `@${user?.username}` },
    { href: adminRoutes.userLoginHistory(userId), label: "Login History", disabled: true },
  ]

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

      {loginHistory.length === 0 ? (
        <div className="text-center text-muted-foreground">No login history found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loginHistory.map((login) => (
              <TableRow key={login.id}>
                <TableCell>{login.id}</TableCell>
                <TableCell>{moment(login.createdAt).fromNow()}</TableCell>
                <TableCell>{login.client}</TableCell>
                <TableCell>{login.device}</TableCell>
                <TableCell className="font-medium">{login.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
