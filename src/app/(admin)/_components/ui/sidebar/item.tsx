"use client"

import Link from "next/link"
import React from "react"

import { usePathname } from "next/navigation"
import { useAppSelector } from "@/store"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  url: string
  icon: LucideIcon
  children?: React.ReactNode
  hasItems?: boolean
}

export const AdminSidebarItem = ({ url, label, icon: Icon, children, hasItems = true }: Props) => {
  const sidebarActive = useAppSelector((state) => state.adminSidebar)
  const pathname = usePathname()
  const isActive = pathname.endsWith(url)

  return (
    <Link
      href={url}
      className={cn(
        "flex gap-2 group items-center text-sm w-full font-semibold text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md transition-colors px-3 pr-0 [&:not(:last-of-type)]:mb-0.5 py-1.5",
        isActive && "bg-indigo-500 text-white",
        sidebarActive && "justify-center text-center px-0 mb-4 py-3"
      )}
    >
      <Icon className={cn("size-4 text-gray-800 block group-hover:text-white transition-colors", isActive && "bg-indigo-500 text-white", sidebarActive && "size-4")} />
      {!sidebarActive && label}
    </Link>
  )
}

/**
 * return (
    <Accordion type="single" collapsible>
      <AccordionItem value={"item-1" + Math.random()} className="border-none p-0 m-0">
        <li className="flex justify-between hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-md transition-colors px-4 pr-0 mb-2">
          <Link href={url} className="flex gap-2 items-center text-sm w-full font-semibold text-gray-700">
            <Icon className="size-4 text-gray-800" />
            {label}
          </Link>
          <AccordionTrigger className="bg-gray-50 p-2 rounded-md text-black transition-colors hover:bg-slate-200"></AccordionTrigger>
        </li>
        <AccordionContent className="pl-10">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
 * 
 */
