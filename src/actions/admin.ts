"use server"

import zod from "zod"
import jwt from "jsonwebtoken"
import db from "@/services/prisma"

import { AdminSchema } from "@/schema"
import { Admin } from "@prisma/client"

import { adminCookieName, apiURL } from "@/lib/constants"
import { cookies } from "next/headers"
import { APIResponse } from "@/types"

type LoginResponseData = { token: string }

export async function adminLoginAction(values: zod.infer<typeof AdminSchema.login>): Promise<APIResponse<LoginResponseData, any>> {
  const loginRequest = await fetch(`${apiURL}/admin/login`, {
    method: "POST",
    body: JSON.stringify(values),
  })
  const data = await loginRequest.json()
  cookies().set(adminCookieName, data?.data?.token, {
    expires: Date.now() + 24 * 60 * 60 * 1000 * 30,
  })
  return data
}

export async function getAdmin() {
  const token = cookies().get(adminCookieName)?.value
  if (!token) return null

  const decodedAdmin = jwt.decode(token) as Admin
  if (!decodedAdmin) return null

  const findAdmin = await db.admin.findUnique({
    where: { id: decodedAdmin.id },
  })
  if (!findAdmin) return null

  const { password, ...admin } = findAdmin
  return admin
}

export async function getAdminOrThrow() {
  const token = cookies().get(adminCookieName)?.value
  if (!token) return null

  const decodedAdmin = jwt.decode(token) as Admin

  const findAdmin = await db.admin.findUnique({
    where: { id: decodedAdmin.id },
  })
  if (!findAdmin) return null

  const { password, ...admin } = findAdmin

  return admin
}
