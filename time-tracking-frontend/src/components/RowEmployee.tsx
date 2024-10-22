import { Tr, Td, Button } from '@chakra-ui/react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { IEmployee } from '../models/iEmployee'
import { useAlertDialog } from './AdminAlertDialog'
//import { AlertType, useAdminAlertDialog } from './AdminAlertDialog'

interface RowProps {
  employee: IEmployee
  onOpen: (employee: IEmployee) => void
}

export function RowEmployee({ employee, onOpen }: RowProps) {
  const { openAlert } = useAlertDialog()

  return (
    <>
      <Tr key={employee.id}>
        <Td>{employee.id}</Td>
        <Td>{employee.status}</Td>
        <Td>{employee.name}</Td>
        <Td>{employee.lastName}</Td>
        <Td>{employee.dni}</Td>
        <Td>{employee.phone}</Td>
        <Td>{employee.email}</Td>
        <Td>{employee.faceImagePath}</Td>
        <Td>{employee.faceEncoding}</Td>
        <Td>{employee.positionId}</Td>
        <Td>{employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : null}</Td>
        <Td>{employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString() : null}</Td>
        <Td>
          <Button
            colorScheme="blue"
            size={'sm'}
            rounded={'full'}
            onClick={() => {
              onOpen(employee)
            }}
          >
            <FaUserEdit />
          </Button>
        </Td>
        <Td>
          <Button
            colorScheme="blue"
            size={'sm'}
            rounded={'full'}
            onClick={() => {
              if (employee.id !== null) {
                console.log('Se abrio')
                openAlert(employee.id)
              }
            }}
          >
            <MdDeleteForever />
          </Button>
        </Td>
      </Tr>
    </>
  )
}
