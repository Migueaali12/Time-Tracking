import { Box, Button, Card, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { IoMenu } from 'react-icons/io5'
import { useAdminDrawer } from '../components/AdminDrawer'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { AdminModal } from '../components/AdminModal'
import { useEmployee } from '../hooks/useEmployee'

export function AdminView() {
  const { drawerComponent, onOpen } = useAdminDrawer()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { employees, setEmployees } = useEmployee()

  useEffect(() => {
    setEmployees()
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
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
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
                  <Td>
                    <Button
                      colorScheme="blue"
                      size={'sm'}
                      rounded={'full'}
                      onClick={() => {
                        openModal()
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
      {isModalOpen && <AdminModal isOpen={isModalOpen} onClose={closeModal} />}
    </DashboardLayout>
  )
}
