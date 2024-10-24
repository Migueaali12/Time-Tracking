import { Button, Card, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { AdminLayout } from '../layouts/AdminLayout'
import { useEffect, useState } from 'react'
import { useEmployee } from '../hooks/useEmployee'
import { IoIosAdd } from 'react-icons/io'
import { RowEmployee } from '../components/RowEmployee'
import { AdminModalForm } from '../components/AdminModal'
import { ClassEmployee, IEmployee } from '../models/iEmployee'
import { AdminAlertDialog } from '../components/AdminAlertDialog'

export interface ModalState {
  employee: IEmployee | null
  isOpen: boolean
}

export interface AlertState {
  employee_id: number | null
  isOpen: boolean
}

export function AdminView() {
  const { employees, setEmployees } = useEmployee()
  const [modalForm, setModalForm] = useState<ModalState>({ employee: null, isOpen: false })
  const [alertDialog, setAlertDialog] = useState<AlertState>({employee_id: null, isOpen: false})

  const openModal = (employee: IEmployee) => {
    setModalForm({ employee: employee, isOpen: true })
  }

  const closeModal = () => {
    setModalForm((prevState) => ({ ...prevState, isOpen: false }))
  }

  const openAlert = (id: number) => {
    setAlertDialog({ employee_id: id, isOpen: true })
  }

  const closeAlert = () => {
    setAlertDialog((prevState) => ({ ...prevState, isOpen: false }))
  }

  useEffect(() => {
    setEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AdminLayout>
      <Button
        colorScheme="blue"
        rounded={'full'}
        mb={5}
        onClick={() => {
          openModal(new ClassEmployee())
        }}
      >
        <IoIosAdd size={20} />
      </Button>

      <Card>
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Status</Th>
                <Th>Name</Th>
                <Th>Lastname</Th>
                <Th>Dni</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <Th>Face Image Path</Th>
                <Th>Face Encoding</Th>
                <Th>Position Id</Th>
                <Th>Created At</Th>
                <Th>Updated At</Th>
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <RowEmployee key={employee.id} employee={employee} openModal={openModal} openAlert={openAlert} />
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Card>
      {modalForm.isOpen && <AdminModalForm modalForm={modalForm} closeModal={closeModal} />}
      {alertDialog.isOpen && <AdminAlertDialog alertState={alertDialog} closeAlert={closeAlert} />}
    </AdminLayout>
  )
}
