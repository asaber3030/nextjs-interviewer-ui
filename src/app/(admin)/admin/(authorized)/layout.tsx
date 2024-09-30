import { adminRoutes } from "@/lib/route"
import { getAdmin } from "@/actions/admin"
import { redirect } from "next/navigation"

import { AdminAuthProvider } from "../../_providers/admin-auth-provider"
import { AdminSidebar } from "../../_components/ui/sidebar/sidebar"
import { AdminNavbar } from "../../_components/ui/navbar/navbar"

type Props = {
  children: React.ReactNode
}

export default async function AdminAuthorizedLayout({ children }: Props) {
  const admin = await getAdmin()
  if (!admin) return redirect(adminRoutes.login())

  return (
    <AdminAuthProvider admin={admin}>
      <div className="flex">
        <AdminSidebar />
        <main className="w-full">
          <AdminNavbar />
          <div className="xl:pr-7 py-6 px-4">{children}</div>
        </main>
      </div>
    </AdminAuthProvider>
  )
}
