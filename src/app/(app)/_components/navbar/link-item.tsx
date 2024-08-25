import Link from "next/link"
import React from "react"

import { ClassValue } from "class-variance-authority/types"
import { LucideIcon } from "lucide-react"
import { Url } from "url"

import { cn } from "@/lib/utils"

type Props = {
  url: any
  label?: String
  icon?: LucideIcon
  linkClassName?: ClassValue
  iconClassName?: ClassValue
  liClassName?: ClassValue
  children?: React.ReactNode
}

export default function NavbarLink({
  linkClassName,
  iconClassName,
  liClassName,
  url,
  label,
  icon: Icon,
  children,
}: Props) {
  return (
    <li className={cn(liClassName)}>
      <Link
        href={url}
        className={cn("flex gap-2 items-center text-sm", linkClassName)}
      >
        {children ? (
          <>{children}</>
        ) : (
          <>
            {Icon && <Icon className={cn("size-4", iconClassName)} />}
            <span>{label}</span>
          </>
        )}
      </Link>
    </li>
  )
}
