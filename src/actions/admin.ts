"use server"

import bcrypt from "bcrypt"
import zod from "zod"
import jwt from "jsonwebtoken"
import db from "@/services/prisma"

import { AdminSchema } from "@/schema"
import { Admin } from "@prisma/client"

import { actionResponse, responseCodes } from "@/lib/api"
import { adminCookieName } from "@/lib/constants"
import { cookies } from "next/headers"

export async function adminLoginAction(
  values: zod.infer<typeof AdminSchema.login>
) {
  try {
    const admin = await db.admin.findUnique({
      where: { email: values.email },
    })

    if (!admin)
      return actionResponse(responseCodes.notFound, "Admin doesn't exist.")

    const comparePasswords = await bcrypt.compare(
      values.password,
      admin.password
    )

    if (!comparePasswords)
      return actionResponse(responseCodes.unauthorized, "Invalid Password")

    const { password, ...payload } = admin

    const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET!, {
      expiresIn: "7d",
    })

    cookies().set(adminCookieName, token)
    return actionResponse(responseCodes.ok, "Authorized successfully", {
      token,
    })
  } catch (error) {
    return actionResponse(responseCodes.serverError, "Error", null, error)
  }
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
