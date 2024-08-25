"use server"

import db from "@/services/prisma"

export async function getCategories() {
  return await db.category.findMany()
}

export async function updateCategory() {
  try {
  } catch (err) {}
}

export async function findCategory() {
  try {
  } catch (err) {}
}

export async function deleteCategory() {
  try {
  } catch (err) {}
}

export async function deleteManyCategories(ids: number[]) {
  try {
  } catch (err) {}
}
