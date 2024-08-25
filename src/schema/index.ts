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
    jobDescription: zod
      .string()
      .min(1, { message: "Job Description is required" }),
  }),
}
