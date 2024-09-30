"use client"

import { useMutation } from "@tanstack/react-query"

import { updateUserImageAction } from "@/actions/users"
import { showResponseMessage } from "@/lib/utils"

import { AvatarUploader } from "@/components/common/uploader"

type Props = {
  userId: number
  children?: React.ReactNode
}

export function UpdateUserImageModal({ userId }: Props) {
  const updateMutation = useMutation({
    mutationFn: (data: string) => updateUserImageAction(userId, data),
    onSuccess: (data) => showResponseMessage(data!),
  })

  const handleUploadSuccess = (url: string) => {
    updateMutation.mutate(url)
  }

  return <AvatarUploader onUploadSuccess={handleUploadSuccess} />
}
