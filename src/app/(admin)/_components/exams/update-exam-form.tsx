"use client"

import zod from "zod"
import queryKeys from "@/lib/query-keys"

import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Form } from "@/components/ui/form"

import { ExamSchema } from "@/schema"
import { Career, Exam } from "@prisma/client"

import { getLevelsOfCareer } from "@/actions/levels"
import { updateExamAction } from "@/actions/exams"
import { responseCodes } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

type Props = {
  exam: Exam
  careers: Career[]
}

export function UpdateExamForm({ exam, careers }: Props) {
  const [selectedCareerId, setSelectedCareerId] = useState(exam.careerId)
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(exam.levelId)

  const form = useForm({
    resolver: zodResolver(ExamSchema.update),
  })

  const levelsQuery = useQuery({
    queryKey: queryKeys.careerLevels(selectedCareerId),
    queryFn: () => getLevelsOfCareer(selectedCareerId),
  })

  const updateMutation = useMutation({
    mutationFn: ({ data, levelId, careerId }: { levelId: number; careerId: number; data: zod.infer<typeof ExamSchema.update> }) => updateExamAction(exam.id, careerId, levelId, data),
    onSuccess: (data) => (data?.status === responseCodes.ok ? toast.success(data.message) : toast.error(data.message)),
  })

  const handleCareerId = (value: string) => {
    setSelectedCareerId(+value)
    setSelectedLevelId(null)
  }

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
      careerId: selectedCareerId,
      levelId: selectedLevelId ? selectedLevelId : exam.levelId,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
        <InputField defaultValue={exam.title} control={form.control} name="title" label="Title" />
        <InputField defaultValue={exam.description} control={form.control} name="description" label="Description" isTextarea />
        <InputField type="number" register={form.register("totalQuestions", { valueAsNumber: true })} defaultValue={exam.totalQuestions} control={form.control} name="totalQuestions" label="Total Questions" />
        <InputField type="number" register={form.register("duration", { valueAsNumber: true })} defaultValue={exam.duration} control={form.control} name="duration" label="Duration" />

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Select defaultValue={String(selectedCareerId)} onValueChange={handleCareerId}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Career" />
            </SelectTrigger>
            <SelectContent>
              {careers.map((career) => (
                <SelectItem key={`c-${career.id}`} value={String(career.id)}>
                  {career.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {levelsQuery.isLoading ? (
            <Skeleton className="w-full h-10 bg-gray-300" />
          ) : (
            <Select defaultValue={String(selectedLevelId)} onValueChange={(value: string) => setSelectedLevelId(Number(value))}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Career" />
              </SelectTrigger>
              <SelectContent>
                {levelsQuery.data?.map((level) => (
                  <SelectItem key={`level-${level.id}`} value={String(level.id)}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <LoadingButton disabled={!selectedCareerId || !selectedLevelId} variant="blue" loading={updateMutation.isPending}>
          Update
        </LoadingButton>
      </form>
    </Form>
  )
}
