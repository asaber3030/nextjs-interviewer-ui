"use server"

import db from "@/services/prisma"
import { Prisma } from "@prisma/client"

export const findCareerById = async (id: number, include?: Prisma.CareerInclude) => {
  const params: Prisma.CareerFindUniqueArgs = {
    where: { id },
    include,
  }
  return await db.career.findUnique(params)
}

export const findManyCareers = async (args?: Prisma.CareerFindManyArgs) => {
  return await db.career.findMany({
    ...args,
  })
}

export const findCareersByCategory = async (categoryId: number, search?: string, take: number = 10) => {
  return await db.career.findMany({
    where: { categoryId, name: { contains: search ?? "" } },
    take,
  })
}
