"use server"

import db from "@/services/prisma"

export async function countTables() {
  const tables = [db.user.count(), db.category.count(), db.exam.count(), db.examQuestion.count(), db.subscription.count(), db.admin.count(), db.career.count(), db.userExam.count(), db.analyticalModel.count(), db.examAnswer.count()]
  const [users, categories, exams, examQuestions, subscriptions, admins, careers, userExams, analyticalModels, examAnswers] = (await Promise.allSettled(tables)).map((item: any) => item?.value)
  return {
    users,
    categories,
    exams,
    examQuestions,
    subscriptions,
    admins,
    careers,
    userExams,
    analyticalModels,
    examAnswers,
  }
}

export async function getFullPlans() {
  return await db.plan.findMany({
    include: { features: { orderBy: { deletedAt: "asc" } } },
  })
}

export async function getPlan(id: number) {
  return await db.plan.findUnique({
    where: { id },
    include: { features: { orderBy: { deletedAt: "asc" } } },
  })
}
