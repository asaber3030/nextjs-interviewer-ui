import { routes } from "@/lib/route"
import { FileStack } from "lucide-react"
import Link from "next/link"

type Props = {
  hideAppName?: boolean
}

export const Logo = ({ hideAppName = false }: Props) => {
  return (
    <Link className="space-x-2 flex items-center" href={routes.home()}>
      <FileStack className="size-6 text-[#203A43]" />
      {!hideAppName && (
        <p className="text-green-800 bg-clip-text inline-block text-transparent font-extrabold text-2xl bg-gradient-to-r from-[#203A43] via-[#203A43] to-[#3fada8]">
          Interviewer
        </p>
      )}
    </Link>
  )
}
