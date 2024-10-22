import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useEmployee } from '../hooks/useEmployee'
import { AlertState } from '../views/Admin'

export interface AlertDialogProps {
  alertState: AlertState
  closeAlert: () => void
}

export function AdminAlertDialog({ alertState, closeAlert }: AlertDialogProps) {
  const { deleteEmployee } = useEmployee()
  const cancelRef = useRef(null)

  const alertComponent = (
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
              onClick={() => {
                if (alertState.employee_id !== null) {
                  deleteEmployee(alertState.employee_id)
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
