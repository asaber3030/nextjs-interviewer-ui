"use server"

import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/route"

import { QuestionSchema } from "@/schema"

import db from "@/services/prisma"
import zod from "zod"

export async function getQuestionsOfExam(examId: number) {
  return await db.examQuestion.findMany({ where: { examId } })
}
export async function getQuestion(id: number) {
  return await db.examQuestion.findUnique({ where: { id }, include: { options: true } })
}

export async function updateQuestionAction(id: number, data: zod.infer<typeof QuestionSchema.update>) {
  try {
    await db.examQuestion.update({
      where: { id },
      data,
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Updated")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function createQuestionAction(examId: number, data: zod.infer<typeof QuestionSchema.create>) {
  try {
    const findLast = await db.examQuestion.findFirst({
      where: { examId },
      orderBy: { id: "desc" },
    })
    await db.examQuestion.create({
      data: {
        ...data,
        examId,
        order: (findLast?.order ?? 0) + 1,
      },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Created")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function forceDeleteQuestionAction(id: number) {
  try {
    await db.examQuestion.delete({
      where: { id },
    })
    revalidatePath(adminRoutes.exams())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}
