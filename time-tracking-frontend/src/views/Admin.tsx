import { Button, Card, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useEffect } from 'react'
import { useEmployee } from '../hooks/useEmployee'
import { IoIosAdd } from 'react-icons/io'
import { RowEmployee } from '../components/RowEmployee'
import { ModalType, useAdminModalForm } from '../components/AdminModal'

export function AdminView() {
  const { openModal, ModalFormComponent } = useAdminModalForm()
  const { employees, setEmployees } = useEmployee()
  //const { openAlert, alertComponent } = useAdminAlertDialog(AlertType.DELETE)

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
          openModal(ModalType.CREATE)
        }}
      >
        <IoIosAdd size={20} />
      </Button>
      {ModalFormComponent(undefined)}

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
                <RowEmployee key={employee.id} employee={employee} />
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
      {/* {alertComponent} */}
    </DashboardLayout>
  )
}
