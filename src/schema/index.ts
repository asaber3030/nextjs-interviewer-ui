import { QuestionType } from "@prisma/client"
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

export const CategorySchema = {
  create: zod.object({
    name: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }),
  }),
  update: zod.object({
    name: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }).optional(),
  }),
}

export const CareerSchema = {
  create: zod.object({
    name: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }),
    categoryId: zod.string().min(0, { message: "Category Id Required" }),
  }),
  update: zod.object({
    name: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }).optional(),
    categoryId: zod.string().min(0, { message: "Category Id Required" }).optional(),
  }),
}

export const LevelSchema = {
  create: zod.object({
    name: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }),
    careerId: zod.string().min(0, { message: "Career Id Required" }),
  }),
  update: zod.object({
    name: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }).optional(),
    careerId: zod.string().min(0, { message: "Career Id Required" }).optional(),
  }),
}

export const ExamSchema = {
  create: zod.object({
    title: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }),
    totalQuestions: zod.number().min(0, { message: "Total Questions cannot be 0" }),
    duration: zod.number().min(0, { message: "Duration cannot be 0" }),
  }),
  update: zod.object({
    title: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    description: zod.string().min(20, { message: "Description cannot be less than 100 characters." }).optional(),
    totalQuestions: zod.number().min(0, { message: "Total Questions cannot be 0" }).optional(),
    duration: zod.number().min(0, { message: "Duration cannot be 0" }).optional(),
  }),
}

export const QuestionSchema = {
  create: zod.object({
    title: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    content: zod.string().min(5, { message: "Content cannot be at least 5 characters." }),
    type: zod.enum([QuestionType.TF, QuestionType.Text, QuestionType.Single, QuestionType.Multiple]),
    questionAnswer: zod.string().min(1, { message: "Required" }),
    order: zod.number().min(0, { message: "Order cannot be 0" }),
    points: zod.number().min(0, { message: "Duration cannot be 0" }),
  }),
  update: zod.object({
    title: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    content: zod.string().min(5, { message: "Content cannot be at least 5 characters." }).optional(),
    type: zod.enum([QuestionType.TF, QuestionType.Text, QuestionType.Single, QuestionType.Multiple]).optional(),
    questionAnswer: zod.string().min(1, { message: "Required" }).optional(),
    order: zod.number().min(0, { message: "Order cannot be 0" }).optional(),
    points: zod.number().min(0, { message: "Duration cannot be 0" }).optional(),
  }),
}
export const QuestionOptionSchema = {
  create: zod.object({
    title: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }),
    isCorrect: zod.boolean().optional(),
  }),
  update: zod.object({
    title: zod.string().min(1, { message: "Name is required" }).max(50, { message: "Plan name cannot me more than 50 characters" }).optional(),
    isCorrect: zod.boolean().optional(),
  }),
}
