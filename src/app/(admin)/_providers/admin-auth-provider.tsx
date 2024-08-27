"use client"

import { TAdmin } from "@/types"
import React, { createContext } from "react"

export const AdminContext = createContext<TAdmin | undefined>(undefined)

type Props = { children: React.ReactNode; admin: TAdmin | undefined }

export const AdminAuthProvider = ({ children, admin }: Props) => {
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
}
