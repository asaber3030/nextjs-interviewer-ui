import db from "@/services/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { cookies } from "next/headers"

import { adminCookieName, adminJWTSecret } from "@/lib/constants"
import { response, responseCodes } from "@/lib/api"
import { extractErrors } from "@/lib/utils"

import { AdminSchema } from "@/schema"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()

  const parsedData = AdminSchema.login.safeParse(body)
  if (!parsedData.success)
    return response(responseCodes.serverError, "Validation errors", {
      errors: extractErrors(parsedData.error),
    })

  const findUser = await db.admin.findUnique({
    where: { email: parsedData.data.email },
  })
  if (!findUser) return response(responseCodes.notFound, "Admin doesn't exist.")

  const comparePassword = await bcrypt.compare(parsedData.data.password, findUser.password)
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.")

  const { password, ...user } = findUser

  const token = jwt.sign(user, adminJWTSecret, {
    expiresIn: "30d",
  })
  cookies().set(adminCookieName, token)
  return response(responseCodes.ok, "Authorized Successfully", { token })
}
