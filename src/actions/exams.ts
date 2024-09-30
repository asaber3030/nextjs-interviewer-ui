"use server"

import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/route"

import { ExamSchema } from "@/schema"

import db from "@/services/prisma"
import zod from "zod"

export async function updateExamAction(id: number, careerId: number, levelId: number, data: zod.infer<typeof ExamSchema.update>) {
  try {
    if (!levelId) return actionResponse(responseCodes.serverError, "Please choose a level")
    if (!careerId) return actionResponse(responseCodes.serverError, "Please choose a career")

    const career = await db.career.findUnique({ where: { id: careerId }, select: { id: true } })
    const level = await db.level.findUnique({ where: { id: levelId }, select: { id: true, careerId: true } })

    if (career?.id !== level?.careerId) return actionResponse(responseCodes.serverError, "Level Doesn't belong to selected career!")

    await db.exam.update({
      where: { id },
      data: {
        ...data,
        careerId,
        levelId,
      },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Updated")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function createExamAction(careerId: number, levelId: number, data: zod.infer<typeof ExamSchema.create>) {
  try {
    const exam = await db.exam.create({
      data: {
        ...data,
        careerId,
        levelId,
      },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Created", exam)
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function forceDeleteExamAction(id: number) {
  try {
    await db.exam.delete({
      where: { id },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function softDeleteExamAction(id: number) {
  try {
    await db.exam.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function restoreExamAction(id: number) {
  try {
    await db.exam.update({
      where: { id },
      data: { deletedAt: null },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}
