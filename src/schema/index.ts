import zod from "zod"

export const UserSchema = {
  login: zod.object({
    email: zod.string().email({ message: "Email address is required" }),
    password: zod.string().min(1, { message: "Password is required" }),
  }),
  register: zod.object({
    email: zod.string().email({ message: "Email is required" }),
    password: zod.string().min(1, { message: "Password is required" }),
    name: zod.string().min(1, { message: "Name is required" }),
    jobTitle: zod.string().min(1, { message: "Job Title is required" }),
    jobDescription: zod.string().min(1, { message: "Job Description is required" }),
  }),
}

export const AdminSchema = {
  login: zod.object({
    email: zod.string().email({ message: "Email address is required" }),
    password: zod.string().min(1, { message: "Password is required" }),
  }),
  register: zod.object({
    email: zod.string().email({ message: "Email is required" }),
    password: zod.string().min(1, { message: "Password is required" }),
    name: zod.string().min(1, { message: "Name is required" }),
    jobTitle: zod.string().min(1, { message: "Job Title is required" }),
    jobDescription: zod.string().min(1, { message: "Job Description is required" }),
  }),
}

export const PlanSchema = {
  update: zod.object({
    name: zod.string().min(1, { message: "Plan name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    price: zod.number().min(0, { message: "Plan price cannot be 0" }).optional(),
    oldPrice: zod.number().min(0, { message: "Old Plan price cannot be 0" }).optional(),
    numberOfLevels: zod.number().min(0, { message: "Number Of Levels cannot be 0" }).optional(),
    numberOfPositions: zod.number().min(0, { message: "Number Of Positions cannot be 0" }).optional(),
    numberOfQuestions: zod.number().min(0, { message: "Number Of Questions cannot be 0" }).optional(),
    description: zod.string().min(100, { message: "Description cannot be less than 100 characters." }).optional(),
    paymentLink: zod.string().url({ message: "Invalid URL" }).optional(),
  }),
}

export const PlanFeatureSchema = {
  create: zod.object({
    name: zod.string().min(1, { message: "Plan name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }),
    isActive: zod.boolean(),
  }),
  update: zod.object({
    name: zod.string().min(1, { message: "Plan name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }).optional(),
    isActive: zod.boolean().optional(),
  }),
}
