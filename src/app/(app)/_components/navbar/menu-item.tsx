import Link from "next/link"
import Image from "next/image"

type Props = {
  url: any
  label: string
  description: string
  image?: string
}

export const NavMenuItem = ({ image, url, label, description }: Props) => {
  return (
    <Link href={url} className="p-2 px-4 rounded-md hover:bg-hoverMain transition-colors h-fit">
      {image ? (
        <div className="flex items-start gap-4 h-fit">
          <Image alt="Image" src={image} width={40} height={40} />
          <div>
            <h3 className="text-sm font-semibold">{label}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-sm font-semibold mb-2">{label}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </>
      )}
    </Link>
  )
}
