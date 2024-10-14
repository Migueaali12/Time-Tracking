import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}
export function AdminModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Hola modal</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
