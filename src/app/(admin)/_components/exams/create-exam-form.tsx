"use client"

import zod from "zod"

import React from "react"

import { useLevelsOfCareer } from "@/hooks/useLevels"
import { useCareers } from "@/hooks/useCareers"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { showResponseMessage } from "@/lib/utils"
import { adminRoutes } from "@/lib/route"
import { createExamAction } from "@/actions/exams"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from "@/components/common/loading-button"
import { InputSkeleton } from "@/components/common/input-skeleton"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"

import { ExamSchema } from "@/schema"
import { Label } from "@/components/ui/label"

export function CreateExamForm() {
  const { careers, careersLoading } = useCareers()
  const { levels, levelsLoading } = useLevelsOfCareer(careers?.[0]?.id ?? 0)

  const [careerId, setCareerId] = useState<number>()
  const [levelId, setLevelId] = useState<number>()

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(ExamSchema.create),
    defaultValues: {
      title: "",
      description: "",
      totalQuestions: 0,
      duration: 0,
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data, levelId, careerId }: { levelId: number; careerId: number; data: zod.infer<typeof ExamSchema.create> }) => createExamAction(careerId, levelId, data),
    onSuccess: (response) =>
      showResponseMessage(response, () => {
        if (response?.data) router.push(adminRoutes.examQuestions(response.data.id))
      }),
  })

  const handleUpdate = () => {
    if (!careerId) return toast.error("Please choose a career")
    if (!levelId) return toast.error("Please choose a level")

    createMutation.mutate({
      data: form.getValues(),
      careerId,
      levelId,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
        <InputField control={form.control} name="title" label="Title" />
        <InputField control={form.control} name="description" label="Description" isTextarea />

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-2">
          <InputField type="number" register={form.register("totalQuestions", { valueAsNumber: true })} control={form.control} name="totalQuestions" label="Total Questions" />
          <InputField type="number" register={form.register("duration", { valueAsNumber: true })} control={form.control} name="duration" label="Duration" />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-2 items-center">
          {careersLoading ? (
            <InputSkeleton />
          ) : (
            <div>
              <Label>Choose a career</Label>
              <Select onValueChange={(value) => setCareerId(Number(value))}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Career" />
                </SelectTrigger>
                <SelectContent>
                  {careers?.map((career) => (
                    <SelectItem key={`c-${career.id}`} value={String(career.id)}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {careerId ? (
            <div>
              {levelsLoading ? (
                <InputSkeleton />
              ) : (
                <React.Fragment>
                  <Label>Choose a level</Label>
                  <Select onValueChange={(value) => setLevelId(Number(value))}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels?.map((level) => (
                        <SelectItem key={`c-${level.id}`} value={String(level.id)}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </React.Fragment>
              )}
            </div>
          ) : (
            <div>
              <Label>Choose a level</Label>
              <div className="text-red-500 p-1.5 border shadow-sm px-4 bg-white rounded-md">Please select a career to choose a level.</div>
            </div>
          )}
        </div>

        <LoadingButton loading={createMutation.isPending}>Create</LoadingButton>
      </form>
      <div className="text-blue-500 font-semibold p-1.5 border shadow-sm px-4 bg-white rounded-md mt-4">
        Please notice after you create an exam you will be redirected to create the exam questions.
      </div>
    </Form>
  )
}
