"use server"

import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/route"

import { CategorySchema } from "@/schema"

import db from "@/services/prisma"
import zod from "zod"

export async function getCategories() {
  return await db.category.findMany()
}

export async function updateCategoryAction(id: number, data: zod.infer<typeof CategorySchema.update>) {
  try {
    await db.category.update({
      where: { id },
      data,
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Updated")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function createCategoryAction(data: zod.infer<typeof CategorySchema.create>) {
  try {
    await db.category.create({
      data: {
        ...data,
        icon: "/images/categories/hardware.svg",
      },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Created")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error)
  }
}

export async function forceDeleteCategoryAction(id: number) {
  try {
    await db.category.delete({
      where: { id },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function softDeleteCategoryAction(id: number) {
  try {
    await db.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}

export async function restoreCategoryAction(id: number) {
  try {
    await db.category.update({
      where: { id },
      data: { deletedAt: null },
    })
    revalidatePath(adminRoutes.categories())
    return actionResponse(responseCodes.ok, "Deleted")
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error)
  }
}
