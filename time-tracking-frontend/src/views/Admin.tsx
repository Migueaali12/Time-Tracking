import { Button, Card, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { useEmployee } from '../hooks/useEmployee'
import { IoIosAdd } from 'react-icons/io'
import { RowEmployee } from '../components/RowEmployee'
import { AdminModalForm } from '../components/AdminModal'
import { ClassEmployee, IEmployee } from '../models/iEmployee'

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

  const onOpen = (employee: IEmployee) => {
    setModalForm({ employee: employee, isOpen: true })
  }

  const onClose = () => {
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
    <DashboardLayout>
      <Button
        colorScheme="blue"
        ml={5}
        rounded={'full'}
        onClick={() => {
          onOpen(new ClassEmployee())
        }}
      >
        <IoIosAdd size={20} />
      </Button>

      <Card m={5}>
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
                <RowEmployee key={employee.id} employee={employee} onOpen={onOpen} />
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
      {modalForm.isOpen && <AdminModalForm modalForm={modalForm} onClose={onClose} />}
    </DashboardLayout>
  )
}
