import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { SearchParams } from "@/types"

import moment from "moment"

export const responseCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  conflict: 403,
  notFound: 404,
  serverError: 500,
}

export function actionResponse<T, P>(
  status: number,
  message: string,
  data?: T,
  errors?: P
) {
  return {
    message,
    data,
    status,
    errors,
  }
}

export function response<T, P>(
  status: number,
  message: string,
  data?: T,
  errors?: P
) {
  return NextResponse.json(
    {
      message,
      data,
      status,
      errors,
    },
    { status }
  )
}

export function generateArray(length: number) {
  return Array.from({ length })
}

export function extractToken(headers: string) {
  return headers.split(" ")[1]
}

export function extractErrors(errors: ZodError) {
  return errors.flatten().fieldErrors
}

export function randomHexColorCode() {
  let colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-gray",
    "bg-orange-500",
  ]
  return colors[Math.floor(Math.random() * 6)]
}

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "lll") {
  return moment(date).format(format)
}

export function createPagination(
  items: SearchParams,
  skipLimit: boolean = false
) {
  const page = Number(items.page)
  const take = items.take ? +items.take : 10
  const orderBy = items.orderBy ?? "id"
  const orderType = items.orderType ?? "desc"

  let skip = (page - 1) * (skipLimit ? 0 : take)

  return {
    orderBy: orderBy as string,
    orderType: orderType as string,
    skip,
    take,
    page,
  }
}

export function formatNumber(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2)
}
