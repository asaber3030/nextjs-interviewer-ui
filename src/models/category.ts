"use server"

import db from "@/services/prisma"
import { Prisma } from "@prisma/client"

export const findCategoryById = async (id: number, include?: Prisma.CategoryInclude) => {
  const params: Prisma.CategoryFindUniqueArgs = {
    where: { id },
    include,
  }
  return await db.category.findUnique(params)
}

export const findManyCategoreis = async (search?: string, params?: Prisma.CategoryFindManyArgs) => {
  return await db.category.findMany({
    where: { name: { contains: search ?? "" } },
    ...params,
  })
}
