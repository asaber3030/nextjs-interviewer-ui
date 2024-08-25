import React from "react"
import AppNavbar from "./_components/navbar/navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  )
}
