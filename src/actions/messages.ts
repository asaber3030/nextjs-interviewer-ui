"use server";

import { actionResponse, responseCodes } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/route";

import { UserMessageSchema } from "@/schema";

import db from "@/services/prisma";
import zod from "zod";

export async function getMessagesOfUserId(userId: number) {
  return await db.userMessage.findMany({ where: { userId }, orderBy: { id: "desc" } });
}

export async function updateUserMessage(id: number, userId: number, data: zod.infer<typeof UserMessageSchema.update>) {
  try {
    await db.userMessage.update({
      where: { id },
      data,
    });
    revalidatePath(adminRoutes.userMessages(userId));
    return actionResponse(responseCodes.ok, "Updated");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function createMessageAction(userId: number, data: zod.infer<typeof UserMessageSchema.create>) {
  try {
    await db.userMessage.create({
      data: {
        ...data,
        userId,
        createdAt: new Date(),
      },
    });
    revalidatePath(adminRoutes.userMessages(userId));
    return actionResponse(responseCodes.ok, "Created");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function forceDeleteMessageAction(id: number, userId: number) {
  try {
    await db.userMessage.delete({
      where: { id },
    });
    revalidatePath(adminRoutes.userMessages(userId));
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}
