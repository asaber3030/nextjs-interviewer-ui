import {
  BookOpenCheck,
  BriefcaseBusiness,
  ChartArea,
  ChartBarBig,
  ChartCandlestick,
  CheckCheck,
  Cog,
  DollarSign,
  File,
  FileQuestion,
  FolderKanban,
  Home,
  List,
  ListOrdered,
  MailPlus,
  NotebookPen,
  Plus,
  User,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react"
import { adminRoutes } from "./route"
import { v4 } from "uuid"

export const solutionsMenuItems = [
  {
    id: v4(),
    url: "/",
    label: "Interviews",
    description: "We provide relible interviews preparation process for your next interview at any tech company.",
  },
  {
    id: v4(),
    url: "/",
    label: "Quizzes",
    description: "Fast quizzes to test your self on your current studying career. We also provide different difficulty levels for quizzes.",
  },
  {
    id: v4(),
    url: "/",
    label: "Documentation",
    description: "We provide simple documentation for position interview and simple outlines.",
  },
]

export const adminSidebarGroups = [
  {
    id: v4(),
    name: "Application",
    items: [
      {
        id: v4(),
        label: "Dashboard",
        url: adminRoutes.dashboard(),
        icon: Home,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Users",
        url: adminRoutes.users(),
        icon: Users,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Plans",
        url: adminRoutes.plans(),
        icon: NotebookPen,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Subscriptions",
        url: adminRoutes.subscriptions(),
        icon: DollarSign,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Categories",
        url: adminRoutes.categories(),
        icon: List,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Careers",
        url: adminRoutes.careers(),
        icon: BriefcaseBusiness,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Levels",
        url: adminRoutes.levels(),
        icon: FolderKanban,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Exams",
        url: adminRoutes.exams(),
        icon: BookOpenCheck,
        hasItems: false,
        items: [],
      },
    ],
  },
  {
    id: v4(),
    name: "Monitoring",
    items: [
      {
        id: v4(),
        label: "Montioring",
        url: `/admin/monitoring`,
        icon: ChartArea,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Activity",
        url: `/admin/activity`,
        icon: ChartBarBig,
        hasItems: false,
        items: [],
      },
      {
        id: v4(),
        label: "Earnings",
        url: `/admin/earnings`,
        icon: ChartCandlestick,
        hasItems: false,
        items: [],
      },
    ],
  },

  {
    id: v4(),
    name: "Settings",
    items: [
      {
        id: v4(),
        label: "Settings",
        url: `/admin/settings`,
        icon: Cog,
      },
      {
        id: v4(),
        label: "App Mode",
        url: `/admin/app-mode`,
        icon: Workflow,
      },
      {
        id: v4(),
        label: "Profile",
        url: `/admin/profile`,
        icon: User,
      },
    ],
  },
]

export const adminDashboardShortcuts = [
  {
    id: v4(),
    label: "Add User",
    icon: UserPlus,
    url: "/",
  },
  {
    id: v4(),
    label: "Add Exam",
    icon: Plus,
    url: "/",
  },
  {
    id: v4(),
    label: "Send E-mails",
    icon: MailPlus,
    url: "/",
  },
  {
    id: v4(),
    label: "View Subscriptions",
    icon: DollarSign,
    url: "/",
  },
  {
    id: v4(),
    label: "App Settings",
    icon: Cog,
    url: "/",
  },
  {
    id: v4(),
    label: "Create Sheets",
    icon: File,
    url: "/",
  },
  {
    id: v4(),
    label: "Careers",
    icon: BriefcaseBusiness,
    url: "/",
  },
  {
    id: v4(),
    label: "Create Category",
    icon: Plus,
    url: "/",
  },
  {
    id: v4(),
    label: "Create Level",
    icon: Plus,
    url: "/",
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/",
  },
]
