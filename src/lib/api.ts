import { NextResponse } from "next/server"

export const responseCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  conflict: 403,
  notFound: 404,
  serverError: 500,
}

export function actionResponse<T, P>(status: number, message: string, data?: T, errors?: P) {
  return {
    message,
    data,
    status,
    errors,
  }
}

export function response<T, P>(status: number, message: string, data?: T, errors?: P) {
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
