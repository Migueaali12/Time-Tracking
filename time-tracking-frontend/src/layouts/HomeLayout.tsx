import { TimeTrackingHeader } from '../components/Header'
import { HeaderType, LayoutProps } from '../types.'

export function HomePageLayout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <TimeTrackingHeader type={HeaderType.HOME} />
      <section className="flex-grow flex justify-center p-5">{children}</section>
    </main>
  )
}
