"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminRoutes } from "@/lib/route"
import { UserMessage } from "@prisma/client"
import { CalendarIcon, MessageCircle } from "lucide-react"

import moment from "moment"
import { useRouter } from "next/navigation"

type Props = {
  messages: UserMessage[]
  userId: number
}

export function UserMessagesCard({ messages, userId }: Props) {
  const router = useRouter()
  return (
    <Card className="h-fit hover:shadow-md transition-colors hover:border-orange-200 cursor-pointer" onClick={() => router.push(adminRoutes.userMessages(userId))}>
      <CardHeader>
        <CardTitle>Lastest Sent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-muted-foreground">No messages found.</p>
          </div>
        ) : (
          <ul className="divide-y">
            {messages.map((message) => (
              <li key={message.id} className="flex justify-between items-start py-2">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center line-clamp-1 gap-2">{message.title}</span>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{moment(message.createdAt).fromNow()}</span>
                  </div>
                </div>
                <Badge variant="secondary">{message.priority}</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
