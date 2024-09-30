"use server"

import db from "@/services/prisma"
import { Prisma } from "@prisma/client"

export const findUserById = async (id: number, include?: Prisma.UserInclude, args?: Prisma.UserFindUniqueArgs) => {
  const params: Prisma.UserFindUniqueArgs = {
    where: { id },
    include,
    ...args,
  }
  return await db.user.findUnique(params)
}

export const findManyUsers = async (args?: Prisma.UserFindManyArgs) => {
  return await db.user.findMany({
    ...args,
  })
}
