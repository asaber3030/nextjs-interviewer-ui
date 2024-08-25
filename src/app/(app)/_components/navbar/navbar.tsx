import React from "react"
import NavbarLink from "./link-item"

import { LogIn, UserPlus } from "lucide-react"
import { Logo } from "@/components/common/logo"
import { Button } from "@/components/ui/button"
import { SolutionsMenu } from "./solutions-menu"
import { CareersMenu } from "./careers-menu"

export default function AppNavbar() {
  return (
    <nav className="bg-white w-full xl:flex xl:justify-between justify-center items-center px-16 py-4">
      <div className="flex flex-col xl:flex-row xl:gap-10 gap-2">
        <Logo />
        <div className="flex">
          <SolutionsMenu />
          <CareersMenu />
        </div>
      </div>
      <ul className="flex gap-4 items-center mt-2 xl:mt-0">
        <NavbarLink url="/">
          <Button>
            <LogIn className="size-4" /> Login
          </Button>
          <Button>
            <UserPlus className="size-4" /> Register
          </Button>
        </NavbarLink>
      </ul>
    </nav>
  )
}
