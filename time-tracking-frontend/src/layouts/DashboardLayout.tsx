import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { IoMenu } from 'react-icons/io5'
import { useAdminDrawer } from '../components/AdminDrawer'

interface LayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: LayoutProps) {
  const { drawerComponent, onOpen } = useAdminDrawer()

  return (
    <main className="h-screen bg-slate-100">
      <Box bg="#3182ce" w="100%" p={4} display={'flex'} justifyContent={'space-between'} mb={5}>
        <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
        <Button size={'sm'} onClick={onOpen} rounded={'full'}>
          <IoMenu size={'20'} />
        </Button>
      </Box>
      {drawerComponent}
      {children}
    </main>
  )
}
