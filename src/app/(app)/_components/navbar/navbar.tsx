import React from "react"
import NavbarLink from "./link-item"

import { Home, LogIn, UserPlus } from "lucide-react"
import { Logo } from "@/components/common/logo"
import { Button } from "@/components/ui/button"
import { SolutionsMenu } from "./solutions-menu"
import { CareersMenu } from "./careers-menu"

export default function AppNavbar() {
  return (
    <nav className="bg-white w-full flex justify-between items-center px-16 py-4">
      <div className="flex gap-10">
        <Logo />
        <div className="flex">
          <SolutionsMenu />
          <CareersMenu />
        </div>
      </div>
      <ul className="flex gap-4 items-center">
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
