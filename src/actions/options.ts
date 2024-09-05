"use server"

import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/route"

import { QuestionOptionSchema } from "@/schema"

import db from "@/services/prisma"
import zod from "zod"

export async function updateOptionAction(id: number, data: zod.infer<typeof QuestionOptionSchema.update>) {
  try {
    await db.examQuestionOption.update({
      where: { id },
      data,
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Updated")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function createOptionAction(questionId: number, data: zod.infer<typeof QuestionOptionSchema.create>) {
  try {
    await db.examQuestionOption.create({
      data: { ...data, examQuestionId: questionId },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Created")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function forceDeleteOptionAction(id: number) {
  try {
    await db.examQuestionOption.delete({
      where: { id },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}
