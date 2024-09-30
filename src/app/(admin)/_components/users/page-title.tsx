import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { adminRoutes } from "@/lib/route"
import { User } from "@prisma/client"
import { AvatarImage } from "@radix-ui/react-avatar"

import Image from "next/image"
import Link from "next/link"

type Props = {
  user: User
}

export const UserPageTitle = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-12">
        <Link href={adminRoutes.viewUser(user.id)} className="block h-full transition-colors hover:opacity-75">
          <AvatarImage className="h-full object-cover" src={user.image ?? "/images/default-avatar.png"} />
        </Link>
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="h-fit text-xs text-gray-500">@{user.username}</p>
      </div>
    </div>
  )
}
