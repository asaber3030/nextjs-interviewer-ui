"use server"

import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/route"

import { CareerSchema } from "@/schema"

import db from "@/services/prisma"
import zod from "zod"

export async function getCareers(search?: string) {
  return await db.career.findMany({
    where: { name: { contains: search ?? "" } },
  })
}

export async function updateCareerAction(id: number, data: zod.infer<typeof CareerSchema.update>) {
  try {
    await db.career.update({
      where: { id },
      data: {
        ...data,
        categoryId: Number(data.categoryId),
      },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Updated")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function createCareerAction(data: zod.infer<typeof CareerSchema.create>) {
  try {
    await db.career.create({
      data: {
        ...data,
        categoryId: Number(data.categoryId),
        icon: "/images/categories/hardware.svg",
      },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Created")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function forceDeleteCareerAction(id: number) {
  try {
    await db.career.delete({
      where: { id },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function softDeleteCareerAction(id: number) {
  try {
    await db.career.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function restoreCareerAction(id: number) {
  try {
    await db.career.update({
      where: { id },
      data: { deletedAt: null },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}
