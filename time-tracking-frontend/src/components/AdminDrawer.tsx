import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { MdLogout } from 'react-icons/md'
import { logoutUser } from '../services/User'
import { useNavigate } from 'react-router-dom'

export function useAdminDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

  const drawerComponent = (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent fontFamily={'Inter'}>
        <DrawerHeader borderBottomWidth="1px">
          <h2 className="italic font-semibold text-2xl">Time Tracking</h2>
        </DrawerHeader>
        <DrawerBody>

        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              logoutUser({ toast, navigate })
            }}
          >
            <MdLogout />
            <Text ml={2}>Cerrar Sesión</Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

  return { drawerComponent, onOpen }
}
