import { HeaderType, LayoutProps } from '../types.'
import { TimeTrackingHeader } from '../components/Header'

export function AdminLayout({ children }: LayoutProps) {


  return (
    <main className="h-screen bg-slate-100">
      <TimeTrackingHeader type={HeaderType.ADMIN}/>
      <section className='m-5'>
      {children}
      </section>
    </main>
  )
}
