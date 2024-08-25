"use client"

import NumberTicker from "@/components/magicui/number-ticker"

type Props = {
  num: number
  label: string
}

export default function StatsNumber({ label, num }: Props) {
  return (
    <div>
      <span className="text-2xl font-medium">
        <NumberTicker value={num} />
      </span>
      <p className="text-xl font-extrabold">{label}</p>
    </div>
  )
}
