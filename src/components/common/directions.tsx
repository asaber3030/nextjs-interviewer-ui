import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { adminRoutes } from "@/lib/route"
import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import Link from "next/link"
import React from "react"

export type DirectionURL = {
  href: string
  label: string | React.ReactNode
  disabled?: boolean
}

type Props = {
  urls: DirectionURL[]
  addAdmin?: boolean
  className?: ClassValue
}

export const Directions = ({ urls, addAdmin = true, className }: Props) => {
  return (
    <Breadcrumb className={cn("px-4 py-2 rounded-md bg-white shadow-sm", className)}>
      <BreadcrumbList>
        {addAdmin && (
          <React.Fragment>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={adminRoutes.dashboard()}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        )}
        {urls.map((url, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {url.disabled ? (
                <p className="font-bold">{url.label}</p>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={url.href}>{url.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="last-of-type:hidden" />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
