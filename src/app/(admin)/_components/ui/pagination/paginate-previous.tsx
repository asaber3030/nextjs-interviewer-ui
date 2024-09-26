"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ClassValue } from "class-variance-authority/types";
import { ArrowLeft } from "lucide-react";

type Props = {
  className?: ClassValue;
  disabled?: boolean;
};

export const PaginatePrevious = ({ className, disabled }: Props) => {
  const params = useSearchParams();
  const router = useRouter();
  const pageParam = params.get("page");
  const pageNumber = Number(pageParam);
  const verifyNaN = isNaN(pageNumber);
  const page = !verifyNaN ? pageNumber : 1;

  return (
    <Button
      variant="outline"
      className={cn(className)}
      disabled={disabled || page < 2}
      onClick={() => router.push(`?page=${page - 1}`)}
    >
      <ArrowLeft className="size-4 text-secondaryMain" />
      Previous
    </Button>
  );
};
