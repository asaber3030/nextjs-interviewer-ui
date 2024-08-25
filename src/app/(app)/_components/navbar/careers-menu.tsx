import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { NavMenuItem } from "./menu-item"

import { getCategories } from "@/actions/categories"

export const CareersMenu = async () => {
  const categories = await getCategories()

  console.log(categories)

  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Careers</NavigationMenuTrigger>
          <NavigationMenuContent className="xl:min-w-[800px] min-w-[300px] p-2">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-2">
              {categories.map((category) => (
                <NavMenuItem
                  key={category.id}
                  label={category.name}
                  description={category.description}
                  image={category.icon}
                  url={"/"}
                />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
