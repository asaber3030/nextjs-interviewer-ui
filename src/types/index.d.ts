import { Admin, Plan, PlanFeature } from "@prisma/client"

export type APIResponse<T, P> = {
  message: string
  status: number
  data?: T
  error?: P
}

export type SearchParams = {
  search?: string
  orderBy?: string
  orderType?: string
  take?: number
  skipLimit?: boolean
  page?: number
}

export type OrderBy = {
  name: string
  label: string
}

export type TAdmin = Omit<Admin, "password">

export type TAdminSidebar = "full" | "only-icons" | "hidden"

export type FullPlan = Plan & { features: PlanFeature[] }
