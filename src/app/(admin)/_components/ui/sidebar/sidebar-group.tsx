import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store"
import React from "react"

type Props = {
  label: String
  children: React.ReactNode
}
export const AdminSidebarGroup = ({ label, children }: Props) => {
  const sidebarActive = useAppSelector((state) => state.adminSidebar)
  return (
    <div className={cn("py-3 pt-4", sidebarActive && "py-1")}>
      {!sidebarActive && <p className="text-xs uppercase font-bold text-gray-500 mb-2 pl-3 ">{label}</p>}

      {children}
    </div>
  )
}
