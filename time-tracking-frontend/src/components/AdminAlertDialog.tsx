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

export enum AlertType {
  DELETE = 'DELETE',
}

export function useAdminAlertDialog(type: AlertType) {
 
  const { deleteEmployee } = useEmployee()
  const [isAlertOpen, setisAlertOpen] = useState(false)
  const cancelRef = useRef(null)

  const openAlert = () => {
    setisAlertOpen(true)
  }

  const closeAlert = () => {
    setisAlertOpen(false)
  }

  const alertComponent = (
    <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={closeAlert}>
      <AlertDialogOverlay>
        <AlertDialogContent fontFamily={'Inter'}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {type === AlertType.DELETE ? 'Eliminar Empleado' : ''}
          </AlertDialogHeader>

          <AlertDialogBody>
            {type === AlertType.DELETE ? 'Estás seguro de eliminar el empleado, esta acción no se podrá deshacer.' : ''}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={} ml={3}>
              {type === AlertType.DELETE ? 'Eliminar' : ''}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  return { isAlertOpen, openAlert, alertComponent }
}
