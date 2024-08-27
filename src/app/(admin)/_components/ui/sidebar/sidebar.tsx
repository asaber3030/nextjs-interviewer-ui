"use client"

import { Flame, Home, List, ListOrdered, Users } from "lucide-react"
import { AdminSidebarHeader } from "./header"
import { AdminSidebarItem } from "./item"
import { AdminSidebarGroup } from "./sidebar-group"
import { AdminSidebarSubItem } from "./sub-item"
import { adminSidebarGroups } from "@/lib/lists"

export const AdminSidebar = () => {
  return (
    <div className="h-full fixed left-0 top-0 bg-white border-r p-4 w-80 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin hidden xl:block md:block">
      <AdminSidebarHeader />

      {adminSidebarGroups.map((group) => (
        <AdminSidebarGroup key={`group-${group.id}`} label={group.name}>
          {group.items.map((sidebarItem) => (
            <AdminSidebarItem
              key={`admin-sidebar-item-${sidebarItem.id}`}
              {...sidebarItem}
            >
              {sidebarItem.items.map((subItem) => (
                <AdminSidebarSubItem
                  key={`admin-sidebar-subitem-${subItem.id}`}
                  {...subItem}
                />
              ))}
            </AdminSidebarItem>
          ))}
        </AdminSidebarGroup>
      ))}
    </div>
  )
}
