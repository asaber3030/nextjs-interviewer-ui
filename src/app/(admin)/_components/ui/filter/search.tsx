"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { build } from "search-params";

import { SearchParams } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { searchParams: SearchParams };

export const SearchFilter = ({ searchParams }: Props) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(searchParams.search ?? "");
  const query = build({ ...searchParams, search: searchValue });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("?" + query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative"
    >
      <Search className="size-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
      <Input
        className="bg-white pl-10"
        placeholder={"Search"}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};
