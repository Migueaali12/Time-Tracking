import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useEmployee } from '../hooks/useEmployee'
import { AlertState } from '../views/Admin'

export interface AlertDialogProps {
  alertState: AlertState
  closeAlert: () => void
}

export function AdminAlertDialog({ alertState, closeAlert }: AlertDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { deleteEmployee } = useEmployee()
  const cancelRef = useRef(null)
  const toast = useToast()

  return (
    <AlertDialog isOpen={alertState.isOpen} leastDestructiveRef={cancelRef} onClose={closeAlert}>
      <AlertDialogOverlay>
        <AlertDialogContent fontFamily={'Inter'}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alertState.employee_id && `Eliminar Empleado ${alertState.employee_id}`}
          </AlertDialogHeader>

          <AlertDialogBody>Estás seguro de eliminar el empleado, esta acción no se podrá deshacer</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              isLoading={isLoading}
              onClick={() => {
                if (alertState.employee_id !== null) {
                  setIsLoading(true)
                  deleteEmployee({ id: alertState.employee_id, toast, setIsLoading, closeAlert })
                }
              }}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
