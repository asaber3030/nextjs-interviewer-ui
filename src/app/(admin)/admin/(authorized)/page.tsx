import React from "react"
import PageTitle from "../../_components/ui/title"
import CountCard from "../../_components/dashboard/count-card"

import { countTables } from "@/actions/app"
import {
  BriefcaseBusiness,
  CheckCheck,
  DollarSign,
  FileQuestion,
  LayoutDashboard,
  List,
  ListCheck,
  ShieldQuestion,
  Users,
} from "lucide-react"
import { adminDashboardShortcuts } from "@/lib/lists"
import ShortcutCard from "../../_components/dashboard/shortcut-card"

export default async function AdminHomePage() {
  const counts = await countTables()
  const dashboardCountCards = [
    {
      id: 1,
      num: counts.users,
      url: "",
      label: "Users",
      icon: Users,
      color: "text-orange-700",
    },
    {
      id: 2,
      num: counts.categories,
      url: "",
      label: "Categories",
      icon: List,
      color: "text-blue-700",
    },
    {
      id: 3,
      num: counts.exams,
      url: "",
      label: "Exams",
      icon: FileQuestion,
      color: "text-yellow-700",
    },
    {
      id: 4,
      num: counts.examQuestions,
      url: "",
      label: "Questions",
      icon: ShieldQuestion,
      color: "text-red-700",
    },
    {
      id: 5,
      num: counts.subscriptions,
      url: "",
      label: "Subscriptions",
      icon: DollarSign,
      color: "text-zinc-700",
    },
    {
      id: 6,
      num: counts.admins,
      url: "",
      label: "Admins",
      icon: Users,
      Lock: "text-stone-700",
    },
    {
      id: 7,
      num: counts.careers,
      url: "",
      label: "Careers",
      icon: BriefcaseBusiness,
      color: "text-lime-700",
    },
    { id: 8, label: "User Exams", icon: CheckCheck, color: "text-emerald-700" },
    {
      id: 9,
      num: counts.userExams,
      url: "",
      label: "Analytical Models",
      icon: LayoutDashboard,
      color: "text-indigo-700",
    },
    {
      id: 10,
      num: counts.examAnswers,
      url: "",
      label: "Exam Answers",
      icon: ListCheck,
      color: "text-rose-700",
    },
  ]
  return (
    <div>
      <PageTitle title="Dashboard" parentClassName="mb-4 border-b pb-2" />
      <section className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
        {dashboardCountCards.map((card) => (
          <CountCard {...card} key={card.id} num={card.num} />
        ))}
      </section>

      <PageTitle title="Shortcuts" parentClassName="mb-4 border-b pb-2 mt-4" />
      <section className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2">
        {adminDashboardShortcuts.map((shortcut) => (
          <ShortcutCard key={shortcut.id} {...shortcut} />
        ))}
      </section>
    </div>
  )
}
