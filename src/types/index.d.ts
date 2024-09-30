import { Admin, Plan, PlanFeature, ExamQuestion, ExamQuestionOption } from "@prisma/client"
import { LucideIcon } from "lucide-react"

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
  take?: string
  skipLimit?: boolean
  page?: string
}

export type OrderBy = {
  name: string
  label: string
}

export type FullQuestion = ExamQuestion & { options: ExamQuestionOption[] }

export type TAdmin = Omit<Admin, "password">

export type TAdminSidebar = "full" | "only-icons" | "hidden"

export type FullPlan = Plan & { features: PlanFeature[] }
