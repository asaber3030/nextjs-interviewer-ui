"use client";

import zod from "zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { createUserAction } from "@/actions/users";
import { responseCodes } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { generatePassword } from "@/lib/utils";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/common/loading-button";
import { CheckboxField } from "@/components/common/checkbox-field";
import { SelectField } from "@/components/common/select-field";
import { InputField } from "@/components/common/input-field";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";

import { Career, Plan } from "@prisma/client";
import { UserSchema } from "@/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  plans: Plan[];
  careers: Career[];
};

export function CreateUserModal({ plans, careers }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserSchema.createFromAdmin),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      isActive: false,
      isEmailVerified: false,
      jobTitle: "",
      jobDescription: "",
      planId: 1,
      careerId: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof UserSchema.createFromAdmin> }) => createUserAction(data),
    onSuccess: (data) => {
      if (data?.status === responseCodes.ok) {
        toast.success(data.message);
        setOpen(false);
        form.reset();
      } else {
        toast.error(data.message);
        return;
      }
    },
  });

  const handleGeneratePassword = () => {
    const password = generatePassword();
    form.setValue("password", password);
  };

  const handleCreate = () => {
    createMutation.mutate({
      data: form.getValues(),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline-success"
        >
          <Plus className="size-4" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[50%]">
        <DialogHeader className="px-4">
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] px-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreate)}
              className="space-y-4"
            >
              <div className="grid xl:grid-cols-2 grid-cols-1 gap-2">
                <InputField
                  control={form.control}
                  name="name"
                  label="Name"
                />
                <InputField
                  control={form.control}
                  name="username"
                  label="Username"
                />
              </div>
              <InputField
                control={form.control}
                name="email"
                label="Email Address"
              />
              <InputField
                control={form.control}
                name="jobTitle"
                label="Job Title"
              />
              <InputField
                control={form.control}
                name="jobDescription"
                label="Job Description"
                isTextarea
              />
              <div>
                <InputField
                  control={form.control}
                  name="password"
                  value={form.getValues("password")}
                  label="Password"
                />
                <Button
                  onClick={handleGeneratePassword}
                  variant="link"
                  type="button"
                  className="px-0"
                >
                  Generate Password
                </Button>
              </div>

              <SelectField
                control={form.control}
                name="planId"
                label="Plan"
                valueAsNumber
              >
                {plans.map((plan) => (
                  <SelectItem value={String(plan.id)}>{plan.name}</SelectItem>
                ))}
              </SelectField>

              <SelectField
                control={form.control}
                name="careerId"
                label="Career"
                valueAsNumber
              >
                {careers.map((career) => (
                  <SelectItem value={String(career.id)}>{career.name}</SelectItem>
                ))}
              </SelectField>

              <CheckboxField
                control={form.control}
                name="isActive"
                label="Is Active"
              />

              <CheckboxField
                control={form.control}
                name="isEmailVerified"
                label="Is Email Verified"
              />

              <DialogFooter>
                <DialogClose className="border rounded-md px-4 hover:bg-gray-50 font-semibold text-sm">Close</DialogClose>
                <LoadingButton
                  loading={createMutation.isPending}
                  variant="outline-success"
                >
                  Create
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
