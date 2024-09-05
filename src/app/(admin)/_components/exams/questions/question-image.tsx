import Image from "next/image"

type Props = {
  image: string | null
}

export const AdminQuestionImage = ({ image }: Props) => {
  if (!image) return null

  return (
    <section>
      <Image alt="Question image" loading="lazy" src={image} width={400} height={400} />
    </section>
  )
}
