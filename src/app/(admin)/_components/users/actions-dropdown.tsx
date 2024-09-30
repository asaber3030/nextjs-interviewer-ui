import { User } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChartArea, Cog, DollarSign, FileQuestion, Image, LucideIcon, Mail, MessageCircle, MoreHorizontal, Printer, Trash, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { adminRoutes } from "@/lib/route"

import Link from "next/link"
import { UpdateUserModal } from "./update-user-modal"
import { UpdateUserCareerAndPlanModal } from "./update-user-plan.tsx"
import { getPlans } from "@/actions/plans"
import { findManyCareers } from "@/models/career"
import { UpdateUserImageModal } from "./update-user-image-modal"

type Props = {
  user: User
}

export const UserActionsDropdown = async ({ user }: Props) => {
  const plans = await getPlans()
  const careers = await findManyCareers()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="indigo" size="sm">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Details</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link className="flex gap-2 items-center w-full" href={adminRoutes.viewUser(user.id)}>
            <UserIcon className="size-4" /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex gap-2 items-center w-full" href={adminRoutes.userTakenExams(user.id)}>
            <FileQuestion className="size-4" /> Exams
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="flex gap-2 items-center w-full" href={adminRoutes.userMessages(user.id)}>
            <MessageCircle className="size-4" /> Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex gap-2 items-center w-full" href={adminRoutes.userMessages(user.id)}>
            <ChartArea className="size-4" /> Activities
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex gap-2 items-center w-full" href={adminRoutes.userSubscriptions(user.id)}>
            <DollarSign className="size-4" /> Subscriptions
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <UpdateUserModal user={user}>
            <div className="relative flex gap-2 hover:bg-input cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <Cog className="size-4" /> Change
            </div>
          </UpdateUserModal>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <UpdateUserCareerAndPlanModal careers={careers} plans={plans} user={user}>
            <div className="relative w-full flex gap-2 hover:bg-input cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <DollarSign className="size-4" /> Plan & Career
            </div>
          </UpdateUserCareerAndPlanModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
