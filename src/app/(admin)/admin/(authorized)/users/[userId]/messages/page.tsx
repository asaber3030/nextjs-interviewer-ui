import db from "@/services/prisma"
import moment from "moment"

import PageTitle from "@/app/(admin)/_components/ui/title"

import { adminRoutes } from "@/lib/route"
import { notFound } from "next/navigation"

import { Metadata } from "next"
import { SearchParams } from "@/types"

import { Button } from "@/components/ui/button"
import { Cog, Dot, Trash } from "lucide-react"
import { SendUserMessageModal } from "@/app/(admin)/_components/users/messages/send-message-modal"
import { Badge } from "@/components/ui/badge"
import { UpdateUserMessageModal } from "@/app/(admin)/_components/users/messages/update-message-modal"
import { DeleteUserMessageModal } from "@/app/(admin)/_components/users/messages/delete-message-modal"
import { UserPageTitle } from "@/app/(admin)/_components/users/page-title"
import { DirectionURL, Directions } from "@/components/common/directions"

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await db.user.findUnique({ where: { id: parseInt(params.userId) } })
  return {
    title: `@${user?.username} - Messages`,
  }
}

export default async function ViewUserIdMessagesPage({ params, searchParams }: Props) {
  const userId = parseInt(params.userId)
  const user = await db.user.findUnique({ where: { id: userId }, include: { career: true } })

  const messages = await db.userMessage.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  })

  const urls: DirectionURL[] = [
    { href: adminRoutes.users(), label: "Users" },
    { href: adminRoutes.viewUser(userId), label: `@${user?.username}` },
    { href: adminRoutes.userLoginHistory(userId), label: "Login History", disabled: true },
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

      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 font-medium">No messages found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((message) => (
            <div key={message.id} className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm font-medium">{message.title}</p>
              <p className="text-xs text-gray-500">{message.description}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Badge variant="outline" className="text-xs">
                    {message.priority}
                  </Badge>
                  <Dot className="size-4" />
                  <p className="text-xs text-gray-500">{moment(message.createdAt).format("DD MMM YYYY")}</p>
                </div>

                <div className="flex items-center gap-2">
                  <UpdateUserMessageModal message={message} userId={userId}>
                    <Button variant="outline" size="sm">
                      <Cog className="size-4" />
                      Edit
                    </Button>
                  </UpdateUserMessageModal>
                  <DeleteUserMessageModal message={message} userId={userId}>
                    <Button variant="destructive" size="sm">
                      <Trash className="size-4" />
                      Delete
                    </Button>
                  </DeleteUserMessageModal>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
