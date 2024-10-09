import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"

export function useAdminDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const drawerComponent = (
        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    )
  
    return { drawerComponent, onOpen }
  }