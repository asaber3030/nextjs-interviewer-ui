import { routes } from "@/lib/route"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

type Props = {
  hideAppName?: boolean
}

export const Logo = ({ hideAppName = false }: Props) => {
  return (
    <Link className="space-x-2 flex items-center" href={routes.home()}>
      <FileQuestion className="size-6 text-blue-500" />
      {!hideAppName && (
        <p className="text-green-800 bg-clip-text inline-block text-transparent font-extrabold text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
          Interviewer
        </p>
      )}
    </Link>
  )
}
