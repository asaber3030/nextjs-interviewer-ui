import { Metadata } from "next"
import LandingPageBanner from "../_components/landing-page/main"

export const metadata: Metadata = {
  title: "Home - Interviewer",
  description: "Interviewer is a platform for helping for your next interviews.",
}

export default async function Home() {
  return (
    <main>
      <LandingPageBanner />
    </main>
  )
}
