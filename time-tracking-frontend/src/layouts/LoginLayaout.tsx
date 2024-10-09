import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function LoginLayout({ children }: LayoutProps) {
  return <main className="h-screen flex justify-center items-center bg-slate-100">{children}</main>
}
