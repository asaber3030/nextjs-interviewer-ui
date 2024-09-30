"use client"

import React from "react"

import { AdminSidebarHeader } from "./header"
import { AdminSidebarItem } from "./item"
import { AdminSidebarGroup } from "./sidebar-group"
import { Button } from "@/components/ui/button"

import { adminSidebarGroups } from "@/lib/lists"
import { useAppSelector } from "@/store"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "./sidebar-trigger"

export const AdminSidebar = () => {
  const sidebarState = useAppSelector((state) => state.adminSidebar)

  return (
    <aside
      className={cn(
        "h-[200vh] bg-white border-r p-4 w-80 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin hidden xl:flex xl:justify-between xl:flex-col md:block",
        sidebarState && "w-20 overflow-hidden"
      )}
    >
      <div className="h-[85vh] flex flex-col justify-between">
        <section>
          <AdminSidebarHeader />
          <section className="divide-y">
            {adminSidebarGroups.map((group) => (
              <AdminSidebarGroup key={`group-${group.id}`} label={group.name}>
                {group.items.map((sidebarItem) => (
                  <AdminSidebarItem key={`admin-sidebar-item-${sidebarItem.id}`} {...sidebarItem} />
                ))}
              </AdminSidebarGroup>
            ))}
          </section>
        </section>
        <div className="flex justify-end mt-4">
          <SidebarTrigger />
        </div>
      </div>
    </aside>
  )
}
