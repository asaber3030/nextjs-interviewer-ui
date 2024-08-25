"use server"

import zod from "zod"

const envSchema = zod.object({
  ENV: zod.enum(["DEVELOPMENT", "PRODUCTION"]),
  DATABASE_URL: zod.string(),
  DATABASE_HOST: zod.string(),
  STRIPE_SECRET: zod.string(),
  APP_URL: zod.string(),
  API_URL: zod.string(),
})

const env = envSchema.parse(process.env)

export default env
