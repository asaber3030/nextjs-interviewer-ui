import { defaultImagePlaceholder } from "@/lib/constants"
import { adminRoutes } from "@/lib/route"
import { Career } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"

type Props = { career: Career }

export const AdminCareerCard = async ({ career }: Props) => {
  return (
    <Link href={adminRoutes.viewCareer(career.id)} className="bg-white shadow-sm rounded-sm flex gap-2 p-4 transition-all border hover:border-orange-300">
      <Image alt="Career Icon" src={career.icon ?? defaultImagePlaceholder} width={40} height={40} />
      <div>
        <p className="text-sm font-medium line-clamp-1">{career.name}</p>
        <p className="line-clamp-1 overflow-hidden w-fit text-xs text-gray-500">{career.description}</p>
      </div>
    </Link>
  )
}
