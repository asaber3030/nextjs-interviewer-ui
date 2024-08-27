import React from "react"

type Props = {
  label: String
  children: React.ReactNode
}
export const AdminSidebarGroup = ({ label, children }: Props) => {
  return (
    <div className="my-4">
      <p className="text-xs uppercase font-bold text-gray-500 mb-2 pl-4">
        {label}
      </p>
      {children}
    </div>
  )
}
