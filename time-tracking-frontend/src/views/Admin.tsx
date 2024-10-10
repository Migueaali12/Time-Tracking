import { Box, Button, Card, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { IoMenu } from 'react-icons/io5'
import { useAdminDrawer } from '../components/AdminDrawer'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { getEmployees } from '../services/Employee'
import { Employee, EmployeeResponse } from '../types'
import { useEffect, useState } from 'react'

export function AdminView() {
  const { drawerComponent, onOpen } = useAdminDrawer()
  const [EmployeeList, setEmployeeList] = useState<Array<Employee> | []>([])
  
  useEffect(() => {
    getEmployees().then((employees) => {
      if (employees !== undefined) {
        const mappedEmployees = employees.map((employee: EmployeeResponse) => ({
          id: employee.id,
          status: employee.status,
          name: employee.name,
          lastName: employee.lastname, 
          dni: employee.dni,
          phone: employee.phone,
          email: employee.email,
          faceImagePath: employee.face_image_path, 
          faceEncoding: employee.face_encoding,
          positionId: employee.position_id,
          createdAt: employee.created_at,
          updatedAt: employee.updated_at,
        }));
        setEmployeeList(mappedEmployees)
      }
    })
  }, [])

  return (
    <DashboardLayout>
      <Box bg="#3182ce" w="100%" p={4} display={'flex'} justifyContent={'space-between'}>
        <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
        <Button size={'sm'} onClick={onOpen} rounded={'full'}>
          <IoMenu size={'20'} />
        </Button>
      </Box>

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
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeList.map((employee) => (
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
                  <Td>{employee.position}</Td>
                  <Td>{new Date(employee.createdAt).toLocaleDateString()}</Td>
                  <Td>{new Date(employee.updatedAt).toLocaleDateString()}</Td>
                </Tr>
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
      {drawerComponent}
    </DashboardLayout>
  )
}
