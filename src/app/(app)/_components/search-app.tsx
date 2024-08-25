import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"

export default function SearchApp() {
  return (
    <div className="relative">
      <Input
        className="rounded-full px-10 bg-white"
        placeholder="Search for careers."
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary size-5" />
    </div>
  )
}
