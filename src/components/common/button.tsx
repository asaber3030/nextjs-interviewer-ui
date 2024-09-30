import { LucideIcon } from "lucide-react"
import { Button, ButtonProps, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"

import Link from "next/link"

interface Common extends ButtonProps {
  icon?: LucideIcon
  href?: string
}

export const Btn = ({ className, size, variant, icon: Icon, children }: Common) => {
  return (
    <Button className={cn(buttonVariants({ variant, size, className }))}>
      {Icon && <Icon className="size-4" />}
      {children}
    </Button>
  )
}

export const LinkBtn = ({ className, href, size, variant, icon: Icon, children }: Common) => {
  return (
    <Link href={href as string}>
      <Button className={cn(buttonVariants({ variant, size, className }))}>
        {Icon && <Icon className="size-4" />}
        {children}
      </Button>
    </Link>
  )
}
