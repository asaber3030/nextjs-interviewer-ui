"use client";

import zod from "zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { updateUserPlanAndCareer } from "@/actions/users";
import { showResponseMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/common/loading-button";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";
import { Form } from "@/components/ui/form";

import { Career, User, Plan } from "@prisma/client";
import { UserSchema } from "@/schema";

type Props = {
  user: User;
  careers: Career[];
  plans: Plan[];
  children: React.ReactNode;
};

export function UpdateUserCareerAndPlanModal({ children, user, careers, plans }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserSchema.changePlanAndCareer),
    defaultValues: {
      planId: user.planId,
      careerId: user.careerId,
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: zod.infer<typeof UserSchema.changePlanAndCareer> }) => updateUserPlanAndCareer(user.id, data),
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Update Career & Plan - <b>{user.username}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-2"
          >
            <SelectField
              control={form.control}
              name="planId"
              label="Plan"
              defaultValue={String(user.planId)}
              valueAsNumber
            >
              {plans.map((plan) => (
                <SelectItem value={String(plan.id)}>{plan.name}</SelectItem>
              ))}
            </SelectField>

            <SelectField
              control={form.control}
              defaultValue={String(user.careerId)}
              name="careerId"
              label="Career"
              valueAsNumber
            >
              {careers.map((career) => (
                <SelectItem value={String(career.id)}>{career.name}</SelectItem>
              ))}
            </SelectField>
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
