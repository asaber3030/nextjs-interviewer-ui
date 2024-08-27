"use client"

import DotPattern from "@/components/magicui/dot-pattern"
import GridPattern from "@/components/magicui/grid-pattern"
import SearchApp from "../search-app"
import StatsNumber from "./number-ticker"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LandingPageBanner() {
  return (
    <div className="relative flex h-[95dvh] w-full flex-col justify-center items-center py-10 overflow-hidden rounded-lg border">
      <section className="text-center xl:w-3/4">
        <h1 className="whitespace-pre-wrap text-center z-10 xl:text-6xl text-3xl font-extrabold tracking-tighter text-black dark:text-white bg-gradient-to-r from-[#203A43] via-[#203A43] to-[#3fada8] inline-block text-transparent bg-clip-text">
          We Have Better Solutions, Career Planning For Your Next Interview
          Trip!
        </h1>
        <p className="xl:text-xl text-sm mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          sequi possimus autem laborum voluptas natus quis laudantium quia
          placeat laboriosam harum nihil quas dolor quo voluptates. Velit eius
          nisi error.
        </p>
      </section>

      <section className="z-10 xl:w-1/2 mt-5">
        <SearchApp />

        <section className="flex gap-2 my-5 justify-center">
          <Link href="/">
            <Button>Careers</Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              Solutions
            </Button>
          </Link>
        </section>
      </section>

      <section className="grid xl:grid-cols-5 grid-cols-2 gap-12 mt-5">
        <StatsNumber num={500} label="Categories" />
        <StatsNumber num={250} label="Careers" />
        <StatsNumber num={5004} label="Questions" />
        <StatsNumber num={5} label="Levels" />
        <StatsNumber num={150} label="Exams" />
      </section>

      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(2000px_circle_at_center,red,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  )
}
