import { Tr, Td, Button } from '@chakra-ui/react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { ModalType, useAdminModalForm } from './AdminModal'
import { Employee } from '../types'
//import { AlertType, useAdminAlertDialog } from './AdminAlertDialog'

export function RowEmployee({ employee }: { employee: Employee }) {
  const { openModal, ModalFormComponent, modalForm } = useAdminModalForm()
  //const { openAlert } = useAdminAlertDialog(AlertType.DELETE)

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
      <Td>{new Date(employee.createdAt).toLocaleDateString()}</Td>
      <Td>{new Date(employee.updatedAt).toLocaleDateString()}</Td>
      <Td>
        <Button
          colorScheme="blue"
          size={'sm'}
          rounded={'full'}
          onClick={() => {
            openModal(ModalType.EDIT)
          }}
        >
          <FaUserEdit />
        </Button>
      </Td>
      <Td>
        <Button colorScheme="blue" size={'sm'} rounded={'full'}>
          <MdDeleteForever />
        </Button>
      </Td>
    </Tr>
    {modalForm.isOpen && ModalFormComponent(employee)}
    </>
  )
}
