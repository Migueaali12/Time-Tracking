import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { MdOutlineTimeline } from 'react-icons/md'
import { HeaderType } from '../types.'
import { IoMenu } from 'react-icons/io5'
import { useAdminDrawer } from './AdminDrawer'
import { Link } from 'react-router-dom'

export function TimeTrackingHeader({ type }: { type: HeaderType }) {
  const { drawerComponent, onOpen } = useAdminDrawer()
  switch (type) {
    case HeaderType.HOME: {
      return (
        <Box bg="rOrange.100" w="100%" p={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <section className="flex items-center text-white">
            <MdOutlineTimeline size={60} />
            <h2 className="text-xl ml-3 font-bold italic">Time tracking</h2>
          </section>
          <ButtonGroup spacing="6">
            <Button
              textColor={'white'}
              _hover={{ textColor: 'black' }}
              _active={{ bg: 'transparent' }}
              bg="transparent"
            >
              <Link to={'/register'}>Registrate</Link>
            </Button>
            <Button bg="white" rounded={'full'}>
              <Link to={'/login'}>Inicia Sesión</Link>
            </Button>
          </ButtonGroup>
        </Box>
      )
    }
    case HeaderType.ADMIN: {
      return (
        <>
          <Box
            bg="rOrange.100"
            w="100%"
            p={5}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={5}
          >
            <section className="flex items-center text-white">
              <MdOutlineTimeline size={60} />
              <h2 className="text-xl ml-3 font-bold italic text-white">Admin Dashboard</h2>
            </section>
            <Button size={'sm'} onClick={onOpen} rounded={'full'}>
              <IoMenu size={'20'} />
            </Button>
          </Box>
          {drawerComponent}
        </>
      )
    }
    case HeaderType.USER: {
      return (
        <Box bg="rOrange.100" w="100%" p={5} display={'flex'} justifyContent={'space-between'} mb={5}>
          <section className="flex items-center text-white">
            <MdOutlineTimeline size={60} />
            <h2 className="text-xl ml-3 font-bold italic">Time tracking</h2>
          </section>
        </Box>
      )
    }
  }
}
