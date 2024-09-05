"use server"

import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/route"

import { LevelSchema } from "@/schema"

import db from "@/services/prisma"
import zod from "zod"

export async function getLevelsOfCareer(careerId: number) {
  return await db.level.findMany({
    where: { careerId },
  })
}

export async function updateLevelAction(id: number, data: zod.infer<typeof LevelSchema.update>) {
  try {
    await db.level.update({
      where: { id },
      data: {
        ...data,
        careerId: Number(data.careerId),
      },
    })
    revalidatePath(adminRoutes.levels())
    return actionResponse(responseCodes.ok, "Updated")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function createLevelAction(data: zod.infer<typeof LevelSchema.create>) {
  try {
    await db.level.create({
      data: {
        ...data,
        careerId: Number(data.careerId),
      },
    })
    revalidatePath(adminRoutes.levels())
    return actionResponse(responseCodes.ok, "Created")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function forceDeleteLevelAction(id: number) {
  try {
    await db.level.delete({
      where: { id },
    })
    revalidatePath(adminRoutes.levels())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function softDeleteLevelAction(id: number) {
  try {
    await db.level.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    revalidatePath(adminRoutes.levels())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function restoreLevelAction(id: number) {
  try {
    await db.level.update({
      where: { id },
      data: { deletedAt: null },
    })
    revalidatePath(adminRoutes.levels())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}
