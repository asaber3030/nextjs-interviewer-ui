"use server";

import { actionResponse, responseCodes } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/route";
import { v4 } from "uuid";

import { UserSchema } from "@/schema";
import { USER_PICTURE_ACCEPTED_IMAGE_TYPES } from "@/lib/constants";

import db from "@/services/prisma";
import zod from "zod";
import bcrypt from "bcrypt";

import { v2 as cloudinary } from "cloudinary";

export async function updateUserDetailsAction(id: number, data: zod.infer<typeof UserSchema.updateDetails>) {
  try {
    const findUsername = await db.user.findFirst({ where: { id: { not: id }, username: data.username }, select: { username: true } });
    if (findUsername) return actionResponse(responseCodes.serverError, "Username already exists");

    const findEmail = await db.user.findFirst({ where: { id: { not: id }, email: data.email }, select: { email: true } });
    if (findEmail) return actionResponse(responseCodes.serverError, "Email already exists");

    await db.user.update({
      where: { id },
      data,
    });
    revalidatePath(adminRoutes.users());
    revalidatePath(adminRoutes.viewUser(id));
    return actionResponse(responseCodes.ok, "Updated");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function updateUserPlanAndCareer(id: number, data: zod.infer<typeof UserSchema.changePlanAndCareer>) {
  try {
    await db.user.update({
      where: { id },
      data,
    });
    revalidatePath(adminRoutes.users());
    revalidatePath(adminRoutes.viewUser(id));
    return actionResponse(responseCodes.ok, "Updated");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function createUserAction(data: zod.infer<typeof UserSchema.createFromAdmin>) {
  try {
    const findUsername = await db.user.findFirst({ where: { username: data.username }, select: { username: true } });
    if (findUsername) return actionResponse(responseCodes.serverError, "Username already exists");

    const findEmail = await db.user.findFirst({ where: { email: data.email }, select: { email: true } });
    if (findEmail) return actionResponse(responseCodes.serverError, "Email already exists");

    const password = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        ...data,
        password,
      },
    });
    revalidatePath(adminRoutes.categories());
    return actionResponse(responseCodes.ok, "Created");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function updateUserImageAction(id: number, data: string) {
  try {
    await db.user.update({
      where: { id },
      data: { image: data },
    });
    revalidatePath(adminRoutes.users());
    revalidatePath(adminRoutes.viewUser(id));
    return actionResponse(responseCodes.ok, "Updated");
  } catch (error) {}
}

export async function softDeleteUserAction(id: number) {
  try {
    await db.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath(adminRoutes.categories());
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}

export async function restoreUserAction(id: number) {
  try {
    await db.user.update({
      where: { id },
      data: { deletedAt: null },
    });
    revalidatePath(adminRoutes.categories());
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}
