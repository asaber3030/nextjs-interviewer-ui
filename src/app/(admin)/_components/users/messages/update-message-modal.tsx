"use client";

import zod from "zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { showResponseMessage } from "@/lib/utils";
import { updateUserMessage } from "@/actions/messages";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

export function UpdateUserMessageModal({ userId, message, children }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserMessageSchema.update),
    defaultValues: {
      title: message.title,
      description: message.description,
      priority: message.priority,
    },
  });

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof UserMessageSchema.update> }) => updateUserMessage(message.id, userId, data),
    onSuccess: (data) => showResponseMessage(data, () => setOpen(false)),
  });

  const handleUpdate = () => {
    createMutation.mutate({
      data: form.getValues(),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Update Message</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <InputField
              control={form.control}
              name="title"
              label="Title"
              defaultValue={message.title}
            />
            <InputField
              control={form.control}
              name="description"
              label="Message Content"
              isTextarea
              defaultValue={message.description}
            />
            <SelectField
              control={form.control}
              name="priority"
              label="Priority"
              defaultValue={message.priority}
            >
              <SelectItem value={Priority.Low}>Low</SelectItem>
              <SelectItem value={Priority.Medium}>Medium</SelectItem>
              <SelectItem value={Priority.High}>High</SelectItem>
            </SelectField>
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
                loading={createMutation.isPending}
                variant="indigo"
                size="sm"
              >
                Send
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
