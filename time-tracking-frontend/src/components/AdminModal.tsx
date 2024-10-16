import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Input,
  Flex,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import { number, object, string } from 'yup'
import { Employee } from '../types'
import { typeModal } from '../views/Admin';

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee
  typeModal: typeModal
}

interface AdminFormProps {
  status: 'ACTIVE' | 'INACTIVE'
  name: string
  lastName: string
  dni: string
  phone: string
  email: string
  // faceImagePath: string
  // faceEncoding: string
  positionId: number
}

export function AdminModal({ isOpen, onClose, employee, typeModal }: ModalProps) {
  const validationSchema = object({
    satus: string(),
    name: string().required('El nombre es requerido'),
    lastName: string().required('El apellido es requerido'),
    dni: string().required('El DNI es requerido'),
    phone: string().required('El teléfono es requerido').matches(/^\d+$/, 'El teléfono solo debe contener números'),
    email: string().required('El email es requerido').email('Debe ser un email válido'),
    // face_image_path: string(),
    // face_encoding: string(),
    positionId: number().required('La posición es requerida'),
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={
              typeModal.type ===  "create"
                ? {
                    status: 'ACTIVE',
                    name: '',
                    lastName: '',
                    dni: '',
                    phone: '',
                    email: '',
                    // face_image_path: '',
                    // face_encoding: '',
                    positionId: 1,
                  }
                : {
                    status: employee.status,
                    name: employee.name,
                    lastName: employee.lastName,
                    dni: employee.dni,
                    phone: employee.phone,
                    email: employee.email,
                    // face_image_path: '',
                    // face_encoding: '',
                    positionId: employee.positionId,
                  }
            }
            validationSchema={validationSchema}
            onSubmit={() => {
              // submit form
              console.log('Submit form')
            }}
          >
            {(props: FormikProps<AdminFormProps>) => (
              <Form>
                <main className="sm:flex gap-10">
                  <Flex flexDirection={'column'} gap={2}>
                    <Field name="status">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.status && !!form.touched.status}>
                          <FormLabel>Estatus</FormLabel>
                          <Select {...field}>
                            <option value="ACTIVE">Activo</option>
                            <option value="INACTIVE">Inactivo</option>
                          </Select>
                          <FormErrorMessage>{form.errors.status?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="name">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                          <FormLabel>Nombre</FormLabel>
                          <Input {...field} placeholder="Nombre" />
                          <FormErrorMessage>{form.errors.name?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastName">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.lastName && !!form.touched.lastName}>
                          <FormLabel>Apellido</FormLabel>
                          <Input {...field} placeholder="Apellido" />
                          <FormErrorMessage>{form.errors.lastName?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex flexDirection={'column'} gap={2}>
                    <Field name="dni">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.dni && !!form.touched.dni}>
                          <FormLabel>DNI</FormLabel>
                          <Input {...field} placeholder="DNI" />
                          <FormErrorMessage>{form.errors.dni?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phone">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.phone && !!form.touched.phone}>
                          <FormLabel>Teléfono</FormLabel>
                          <Input {...field} placeholder="Teléfono" />
                          <FormErrorMessage>{form.errors.phone?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} placeholder="Email" />
                          <FormErrorMessage>{form.errors.email?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex flexDirection={'column'} gap={2}>
                    <Field name="positionId">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.positionId && !!form.touched.positionId}>
                          <FormLabel>Posición</FormLabel>
                          <Select {...field}>
                            <option value={1}>Contabilidad</option>
                            <option value={2}>Sistemas</option>
                          </Select>
                          <FormErrorMessage>{form.errors.status?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </main>

                <ModalFooter pr={0}>
                  <Button colorScheme="blue" mr={3} isLoading={props.isSubmitting} type="submit">
                    Enviar
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
