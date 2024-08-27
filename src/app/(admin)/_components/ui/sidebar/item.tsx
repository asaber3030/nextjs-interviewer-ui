import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LucideIcon } from "lucide-react"
import React from "react"

type Props = {
  label: string
  url: string
  icon: LucideIcon
  children: React.ReactNode
}

export const AdminSidebarItem = ({
  url,
  label,
  icon: Icon,
  children,
}: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={"item-1" + Math.random()}
        className="border-none p-0 m-0"
      >
        <li className="flex justify-between hover:bg-gray-100 rounded-md transition-all px-4 pr-0 mb-2">
          <Link
            href={url}
            className="flex gap-2 items-center text-sm w-full font-semibold text-gray-700"
          >
            <Icon className="size-4 text-gray-800" />
            {label}
          </Link>
          <AccordionTrigger className="bg-gray-50 p-2 rounded-md text-black transition-all hover:bg-slate-200"></AccordionTrigger>
        </li>
        <AccordionContent className="pl-10">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
