"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store"
import { triggerAdminSidebar } from "@/store/slices/adminSidebar.slice"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

export const SidebarTrigger = () => {
  const sidebarState = useAppSelector((state) => state.adminSidebar)
  const dispatch = useAppDispatch()
  const Icon = sidebarState ? ChevronsRight : ChevronsLeft

  const onClick = () => {
    dispatch(triggerAdminSidebar())
  }

  return (
    <button className={cn("bg-gray-100 rounded-md p-2 hover:bg-indigo-600 group transition-colors", sidebarState && "bg-indigo-600")} onClick={onClick}>
      <Icon className={cn("size-5 text-gray-500 group-hover:text-white transition-colors", sidebarState && "text-white")} />
    </button>
  )
}
