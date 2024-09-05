import { BriefcaseBusiness, CheckCheck, Cog, DollarSign, File, FileQuestion, Home, List, ListOrdered, MailPlus, Plus, UserPlus, Users } from "lucide-react"
import { adminRoutes } from "./route"

export const solutionsMenuItems = [
  {
    id: 1,
    url: "/",
    label: "Interviews",
    description: "We provide relible interviews preparation process for your next interview at any tech company.",
  },
  {
    id: 2,
    url: "/",
    label: "Quizzes",
    description: "Fast quizzes to test your self on your current studying career. We also provide different difficulty levels for quizzes.",
  },
  {
    id: 3,
    url: "/",
    label: "Documentation",
    description: "We provide simple documentation for position interview and simple outlines.",
  },
]

export const adminSidebarGroups = [
  {
    id: 1,
    name: "Applications",
    items: [
      {
        id: 1,
        label: "Dashboard",
        url: adminRoutes.dashboard(),
        icon: Home,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 2,
        label: "Users",
        url: adminRoutes.dashboard(),
        icon: Users,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 3,
        label: "Plans",
        url: adminRoutes.plans(),
        icon: DollarSign,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 4,
        label: "Subscriptions",
        url: adminRoutes.dashboard(),
        icon: CheckCheck,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 5,
        label: "Categories",
        url: adminRoutes.categories(),
        icon: List,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 6,
        label: "Careers",
        url: adminRoutes.careers(),
        icon: BriefcaseBusiness,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 7,
        label: "Levels",
        url: adminRoutes.levels(),
        icon: ListOrdered,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
      {
        id: 8,
        label: "Exams",
        url: adminRoutes.exams(),
        icon: FileQuestion,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Monitoring",
    items: [
      {
        id: 9,
        label: "Dashboard",
        url: adminRoutes.dashboard(),
        icon: Home,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Settings",
    items: [
      {
        id: 10,
        label: "Dashboard",
        url: adminRoutes.dashboard(),
        icon: Home,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
    ],
  },
]

export const adminDashboardShortcuts = [
  {
    id: 1,
    label: "Add User",
    icon: UserPlus,
    url: "/",
  },
  {
    id: 2,
    label: "Add Exam",
    icon: Plus,
    url: "/",
  },
  {
    id: 3,
    label: "Send E-mails",
    icon: MailPlus,
    url: "/",
  },
  {
    id: 4,
    label: "View Subscriptions",
    icon: DollarSign,
    url: "/",
  },
  {
    id: 5,
    label: "App Settings",
    icon: Cog,
    url: "/",
  },
  {
    id: 6,
    label: "Create Sheets",
    icon: File,
    url: "/",
  },
  {
    id: 7,
    label: "Careers",
    icon: BriefcaseBusiness,
    url: "/",
  },
  {
    id: 8,
    label: "Create Category",
    icon: Plus,
    url: "/",
  },
  {
    id: 9,
    label: "Create Level",
    icon: Plus,
    url: "/",
  },
  {
    id: 10,
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: 11,
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: 12,
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: 13,
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: 14,
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
]
