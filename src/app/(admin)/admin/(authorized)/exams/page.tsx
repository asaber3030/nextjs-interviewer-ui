import db from "@/services/prisma"

import PageTitle from "@/app/(admin)/_components/ui/title"
import Link from "next/link"
import EmptyStateCard from "@/components/common/empty-state"

import { AdminCareerCard } from "@/app/(admin)/_components/careers/career-card"
import { SearchParams } from "@/types"
import { Metadata } from "next"
import { Plus } from "lucide-react"
import { SearchFilter } from "@/app/(admin)/_components/ui/filter/search"
import { LinkBtn } from "@/components/common/button"

import { adminRoutes } from "@/lib/route"

type Props = {
  searchParams: SearchParams
}
export const metadata: Metadata = {
  title: "Exams",
}

export default async function ExamsPage({ searchParams }: Props) {
  const categories = await db.category.findMany({
    include: {
      careers: {
        where: {
          deletedAt: null,
          OR: [{ name: { contains: searchParams.search ?? "" } }, { description: { contains: searchParams.search ?? "" } }],
        },
      },
    },
  })

  return (
    <div>
      <PageTitle title="Exams" parentClassName="flex gap-2">
        <SearchFilter searchParams={searchParams} />
        <LinkBtn href={adminRoutes.createExam()} icon={Plus}>
          Create Exam
        </LinkBtn>
      </PageTitle>

      {categories.length === 0 && <EmptyStateCard />}

      {categories.map((category) => (
        <div className="mt-2">
          <div className="mb-2">
            <Link href={adminRoutes.viewCategory(category.id)} className="text-xl w-fit font-medium flex gap-2 items-center transition-colors hover:text-blue-500">
              {category.name}
            </Link>
            <p className="text-gray-500 text-xs">{category.description}</p>
          </div>
          {category.careers.length === 0 ? (
            <EmptyStateCard />
          ) : (
            <section className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-1 mb-6">
              {category.careers.map((career) => (
                <AdminCareerCard key={career.id} career={career} />
              ))}
            </section>
          )}
        </div>
      ))}
    </div>
  )
}
