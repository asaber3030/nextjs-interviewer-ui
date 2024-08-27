import {
  BriefcaseBusiness,
  CheckCheck,
  DollarSign,
  Home,
  List,
  ListOrdered,
  Users,
} from "lucide-react"
import { adminRoutes } from "./route"

export const solutionsMenuItems = [
  {
    id: 1,
    url: "/",
    label: "Interviews",
    description:
      "We provide relible interviews preparation process for your next interview at any tech company.",
  },
  {
    id: 2,
    url: "/",
    label: "Quizzes",
    description:
      "Fast quizzes to test your self on your current studying career. We also provide different difficulty levels for quizzes.",
  },
  {
    id: 3,
    url: "/",
    label: "Documentation",
    description:
      "We provide simple documentation for position interview and simple outlines.",
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
        url: adminRoutes.dashboard(),
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
        url: adminRoutes.dashboard(),
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
        url: adminRoutes.dashboard(),
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
        url: adminRoutes.dashboard(),
        icon: ListOrdered,
        items: [
          { id: 1, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 2, label: "Do Something", url: adminRoutes.dashboard() },
          { id: 3, label: "Do Something", url: adminRoutes.dashboard() },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Monitoring",
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
    ],
  },

  {
    id: 1,
    name: "Settings",
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
    ],
  },
]

export const adminSidebarItems = []
