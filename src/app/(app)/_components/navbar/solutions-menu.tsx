import React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { NavMenuItem } from "./menu-item"

import { solutionsMenuItems } from "@/lib/lists"

export const SolutionsMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px] p-2">
            <div className="flex flex-col gap-2">
              {solutionsMenuItems.map((item) => (
                <NavMenuItem key={item.id} {...item} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
