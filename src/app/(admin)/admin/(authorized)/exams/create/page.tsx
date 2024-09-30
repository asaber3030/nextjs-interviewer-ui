import PageTitle from "@/app/(admin)/_components/ui/title"

import { CreateExamForm } from "@/app/(admin)/_components/exams/create-exam-form"

import React from "react"

export default async function CreateExamPage() {
  return (
    <div>
      <PageTitle title="Create New Exam" parentClassName="mb-4" />
      <p></p>
      <CreateExamForm />
    </div>
  )
}
