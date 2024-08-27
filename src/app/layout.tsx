import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactQueryProvider } from "@/providers"
import { Toaster } from "@/components/ui/sonner"
import ReduxProvider from "@/providers/redux"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ReduxProvider>
            <Toaster
              richColors
              position="top-right"
              style={{ zIndex: 100, backgroundColor: "#fff" }}
            />
            {children}
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
