"use server"

import db from "@/services/prisma"
import { Prisma } from "@prisma/client"

export const findExamById = async (id: number, include?: Prisma.ExamInclude) => {
  const params: Prisma.ExamFindUniqueArgs = {
    where: { id },
    include,
  }
  return await db.exam.findUnique(params)
}

export const findManyExams = async (search?: string, take: number = 10) => {
  return await db.level.findMany({
    where: { name: { contains: search ?? "" } },
    take,
  })
}

export const findExamsByCareer = async (careerId: number, search?: string, take: number = 10) => {
  return await db.level.findMany({
    where: { careerId, name: { contains: search ?? "" } },
    take,
  })
}
