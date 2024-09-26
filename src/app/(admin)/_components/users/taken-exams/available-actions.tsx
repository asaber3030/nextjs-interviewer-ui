"use client";

import { Exam, UserExam } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { adminRoutes } from "@/lib/route";
import { TakenExamQuickViewModal } from "./quick-view-modal";

type Props = {
  exam: UserExam & {
    exam: Exam;
  };
};
export const TakenExamAvailableActionsDropdown = ({ exam }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="indigo"
          size="sm"
        >
          <MoreHorizontal className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={adminRoutes.viewUserTakenExam(exam.userId, exam.examId)}>View</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>Send Message</DropdownMenuItem>
        <DropdownMenuItem>Send Mail</DropdownMenuItem>
        <DropdownMenuItem>Analytics</DropdownMenuItem>
        <DropdownMenuItem>Print</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
