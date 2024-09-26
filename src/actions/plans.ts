"use server";

import { actionResponse, responseCodes } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/route";

import { PlanFeatureSchema, PlanSchema } from "@/schema";

import db from "@/services/prisma";
import zod from "zod";

export async function getPlans() {
  const plans = await db.plan.findMany({
    where: { deletedAt: null },
  });
  return plans;
}

export async function updatePlanAction(id: number, data: zod.infer<typeof PlanSchema.update>) {
  try {
    await db.plan.update({
      where: { id },
      data,
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(id));
    return actionResponse(responseCodes.ok, "Updated");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function createPlanFeatureAction(planId: number, data: zod.infer<typeof PlanFeatureSchema.create>) {
  try {
    await db.planFeature.create({
      data: {
        planId,
        ...data,
      },
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(planId));
    return actionResponse(responseCodes.ok, "Created");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function updatePlanFeatureAction(id: number, data: zod.infer<typeof PlanFeatureSchema.update>) {
  try {
    const feature = await db.planFeature.update({
      where: { id },
      data,
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(feature.planId));
    return actionResponse(responseCodes.ok, "Updated");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to updated, Something went wrong.", null, error);
  }
}

export async function forceDeletePlanAction(id: number) {
  try {
    await db.plan.delete({
      where: { id },
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(id));
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}

export async function softDeletePlanAction(id: number) {
  try {
    await db.plan.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(id));
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}

export async function forceDeletePlanFeatureAction(id: number) {
  try {
    await db.planFeature.delete({
      where: { id },
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(id));
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}

export async function softDeletePlanFeatureAction(id: number) {
  try {
    await db.planFeature.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(id));
    return actionResponse(responseCodes.ok, "Deleted");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to delete, Something went wrong.", null, error);
  }
}

export async function restorePlanFeatureAction(id: number) {
  try {
    await db.planFeature.update({
      where: { id },
      data: { deletedAt: null },
    });
    revalidatePath(adminRoutes.plans());
    revalidatePath(adminRoutes.updatePlan(id));
    return actionResponse(responseCodes.ok, "Restored");
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Failed to restore, Something went wrong.", null, error);
  }
}
