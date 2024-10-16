import { Button, Card, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { AdminModal } from '../components/AdminModal'
import { useEmployee } from '../hooks/useEmployee'
import { IoIosAdd } from 'react-icons/io'

export interface typeModal {
  type: 'create' | 'update'
}

export function AdminView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { employees, setEmployees } = useEmployee()
  const [typeModal, setTypeModal] = useState<typeModal>({type:'create'})

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setEmployees()
  }, [])

  return (
    <DashboardLayout>
      <Button
        colorScheme="blue"
        ml={5}
        rounded={'full'}
        onClick={() => {
          setTypeModal({type: 'create'})
          openModal()
        }}
      >
        <IoIosAdd size={20} />
      </Button>
      {isModalOpen && typeModal.type === 'create' ?  <AdminModal isOpen={isModalOpen} onClose={closeModal} employee={employees[0]} typeModal={typeModal}  /> : null}

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
                  <Td>{employee.positionId}</Td>
                  <Td>{new Date(employee.createdAt).toLocaleDateString()}</Td>
                  <Td>{new Date(employee.updatedAt).toLocaleDateString()}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size={'sm'}
                      rounded={'full'}
                      onClick={() => {
                        setTypeModal({type: 'update'})
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
                  {isModalOpen && <AdminModal isOpen={isModalOpen} onClose={closeModal} employee={employee} typeModal={typeModal}/>}
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
    </DashboardLayout>
  )
}
