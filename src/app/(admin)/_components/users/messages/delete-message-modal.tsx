"use client";

import zod from "zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { showResponseMessage } from "@/lib/utils";
import { forceDeleteMessageAction, updateUserMessage } from "@/actions/messages";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputField } from "@/components/common/input-field";
import { LoadingButton } from "@/components/common/loading-button";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserMessageSchema } from "@/schema";
import { Priority, UserMessage } from "@prisma/client";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";

type Props = {
  message: UserMessage;
  children: React.ReactNode;
  userId: number;
};

export function DeleteUserMessageModal({ userId, message, children }: Props) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => forceDeleteMessageAction(message.id, userId),
    onSuccess: (data) => showResponseMessage(data, () => setOpen(false)),
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>Are you sure you want to delete this message?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </DialogClose>
          <LoadingButton
            loading={deleteMutation.isPending}
            variant="destructive"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
