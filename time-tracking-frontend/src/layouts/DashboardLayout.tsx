import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: LayoutProps) {
  return <main className="h-screen bg-slate-100">{children}</main>
}
