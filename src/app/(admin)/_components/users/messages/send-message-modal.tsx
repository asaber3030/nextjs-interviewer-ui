"use client";

import zod from "zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { showResponseMessage } from "@/lib/utils";
import { createMessageAction } from "@/actions/messages";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputField } from "@/components/common/input-field";
import { LoadingButton } from "@/components/common/loading-button";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserMessageSchema } from "@/schema";
import { Priority, User } from "@prisma/client";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";

type Props = {
  user: User;
  defaultPriority?: Priority;
  children: React.ReactNode;
};

export function SendUserMessageModal({ user, defaultPriority, children }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserMessageSchema.create),
    defaultValues: {
      title: "",
      description: "",
      priority: defaultPriority ?? Priority.Low,
    },
  });

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof UserMessageSchema.create> }) => createMessageAction(user.id, data),
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
          <DialogTitle>
            Message - <b>@{user.username}</b>
          </DialogTitle>
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
            />
            <InputField
              control={form.control}
              name="description"
              label="Message Content"
              isTextarea
            />
            <SelectField
              control={form.control}
              name="priority"
              label="Priority"
            >
              <SelectItem value={String(Priority.Low)}>Low</SelectItem>
              <SelectItem value={String(Priority.Medium)}>Medium</SelectItem>
              <SelectItem value={String(Priority.High)}>High</SelectItem>
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
