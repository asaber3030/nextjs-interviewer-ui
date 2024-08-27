import React from "react"
import Image from "next/image"

import { AdminLoginForm } from "@/app/(admin)/_components/auth/login-form"
import { getAdmin } from "@/actions/admin"
import { redirect } from "next/navigation"
import { adminRoutes } from "@/lib/route"

export default async function AdminLoginPage() {
  const admin = await getAdmin()
  if (admin) return redirect(adminRoutes.dashboard())

  return (
    <div className="xl:w-1/2 xl:mx-auto m-4 bg-white my-10 rounded-md shadow-md p-6">
      <header>
        <Image
          className="mx-auto my-4"
          width={50}
          height={50}
          src="/images/defaults/login.svg"
          alt="Login Image"
        />
        <h1 className="text-2xl font-bold text-center my-4">Admin Login</h1>
      </header>
      <AdminLoginForm />
    </div>
  )
}
