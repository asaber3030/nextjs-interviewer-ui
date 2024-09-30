"use client"

import Link from "next/link"

import { useContext } from "react"
import { useAppSelector } from "@/store"
import { adminRoutes } from "@/lib/route"

import { AdminContext } from "@/app/(admin)/_providers/admin-auth-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AdminSidebarHeaderDropdown } from "./header-dropdown"

export const AdminSidebarHeader = () => {
  const admin = useContext(AdminContext)
  const sidebarActive = useAppSelector((state) => state.adminSidebar)

  if (sidebarActive) {
    return (
      <Avatar className="size-12 mb-4">
        <AvatarFallback className="bg-gray-200 font-medium">
          {admin?.name?.[0]}
          {admin?.name?.[1]}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="flex gap-3 p-4 relative border rounded-md shadow-sm mb-4 bg-gray-50/95">
      <Avatar className="size-12">
        <AvatarFallback className="bg-gray-200 font-medium">
          {admin?.name?.[0]}
          {admin?.name?.[1]}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{admin?.name}</p>
        <Link className="text-xs text-gray-500 hover:underline" href={adminRoutes.profile()}>
          @{admin?.username}
        </Link>
      </div>
      <div className="absolute right-4 top-4">
        <AdminSidebarHeaderDropdown />
      </div>
    </div>
  )
}
