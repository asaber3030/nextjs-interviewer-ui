"use client";

import zod from "zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { updateUserDetailsAction } from "@/actions/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { showResponseMessage } from "@/lib/utils";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputField } from "@/components/common/input-field";
import { LoadingButton } from "@/components/common/loading-button";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { UserSchema } from "@/schema";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export function UpdateUserModal({ user }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserSchema.updateDetails),
  });

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof UserSchema.updateDetails> }) => updateUserDetailsAction(user.id, data),
    onSuccess: (data) => showResponseMessage(data, () => setOpen(false)),
  });

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues(),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <Edit className="size-4" /> Update
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Update User - <b>{user.username}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <InputField
              defaultValue={user.name}
              control={form.control}
              name="name"
              label="Name"
            />
            <InputField
              defaultValue={user.username}
              control={form.control}
              name="username"
              label="Username"
            />
            <InputField
              defaultValue={user.email}
              control={form.control}
              name="email"
              label="Email Address"
            />
            <InputField
              defaultValue={user.jobTitle || ""}
              control={form.control}
              name="jobTitle"
              label="Job Title"
            />
            <InputField
              defaultValue={user.jobDescription || ""}
              control={form.control}
              name="jobDescription"
              label="Job Description"
              isTextarea
            />
            <DialogFooter>
              <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
              <LoadingButton loading={updateMutation.isPending}>Update</LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
