import Link from "next/link"
import PageTitle from "../ui/title"

import { Button } from "@/components/ui/button"
import { CareerDetailsModal, UpdateCareerModal } from "."
import { RestoreModal } from "../ui/restore-modal"
import { DeleteModal } from "../ui/delete-modal"

import { Career, Category } from "@prisma/client"

import { forceDeleteCareerAction, restoreCareerAction, softDeleteCareerAction } from "@/actions/careers"
import { adminRoutes } from "@/lib/route"
import { LinkBtn } from "@/components/common/button"
import { CreateLevelModal } from "../levels"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { dropdownMenuItemStyles } from "@/lib/constants"

type Props = {
  career: Career
  categories: Category[]
}

export const CareerIdTitle = ({ career, categories }: Props) => {
  const pageTitle = (
    <span>
      Career - <strong className="font-bold">{career.name}</strong>
    </span>
  )
  return (
    <PageTitle title={pageTitle}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="indigo" size="sm">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          <DropdownMenuItem>Details</DropdownMenuItem>
          <DropdownMenuItem>Exams</DropdownMenuItem>
          <DropdownMenuItem>Users</DropdownMenuItem>
          <DropdownMenuItem>Users</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>Create Level</DropdownMenuItem>
          <DropdownMenuSeparator />
          {career.deletedAt ? <RestoreModal className={dropdownMenuItemStyles} deletedId={career.id} title="Restore" action={restoreCareerAction} /> : <DeleteModal buttonLabel="Delete" deletedId={career.id} softAction={softDeleteCareerAction} forceAction={forceDeleteCareerAction} className={dropdownMenuItemStyles} />}
        </DropdownMenuContent>
      </DropdownMenu>
    </PageTitle>
  )
}
