import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminRoutes } from "@/lib/route"
import { Career } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"

type Props = {
  career: Career
}

export function UserCareerCard({ career }: Props) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Career Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href={adminRoutes.viewCareer(career.id)}
          className="space-y-2 flex flex-col items-center justify-center transition-colors hover:border hover:border-orange-200 rounded-md p-2 py-4 border border-transparent"
        >
          <Image src={career.icon || "/images/categories/hardware.svg"} alt={career.name} width={35} height={35} />
          <div className="flex justify-center font-bold text-lg">{career.name}</div>
        </Link>
      </CardContent>
    </Card>
  )
}
