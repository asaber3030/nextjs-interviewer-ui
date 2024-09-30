"use server"

import db from "@/services/prisma"
import { Prisma } from "@prisma/client"

export const findLevelById = async (id: number, include?: Prisma.LevelInclude) => {
  const params: Prisma.LevelFindUniqueArgs = {
    where: { id },
    include,
  }
  return await db.level.findUnique(params)
}

export const findManyLevels = async (search?: string, take: number = 10) => {
  return await db.level.findMany({
    where: { name: { contains: search ?? "" } },
    take,
  })
}

export const findLevelsByCareer = async (careerId: number, search?: string, take: number = 10) => {
  return await db.level.findMany({
    where: { careerId, name: { contains: search ?? "" } },
    take,
  })
}
