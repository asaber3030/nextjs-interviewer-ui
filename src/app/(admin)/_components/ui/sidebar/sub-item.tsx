import Link from "next/link"

type Props = {
  label: string
  url: string
}

export const AdminSidebarSubItem = ({ url, label }: Props) => {
  return (
    <Link href={url} className="flex gap-2 items-center text-xs w-full font-medium text-gray-700 p-3 py-2 rounded-md transition-colors hover:bg-gray-100">
      {label}
    </Link>
  )
}
