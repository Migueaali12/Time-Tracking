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
  useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import { number, object, string } from 'yup'
import { ModalState } from '../views/Admin'
import { ClassEmployee, IEmployee } from '../models/iEmployee'
import { useEmployee } from '../hooks/useEmployee'

interface ModalProps {
  modalForm: ModalState
  closeModal: () => void
}

export function AdminModalForm({ modalForm, closeModal }: ModalProps) {
  const toast = useToast()
  const { updateEmployee, addEmployee } = useEmployee()
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
    <Modal isOpen={modalForm.isOpen} onClose={closeModal} size={'3xl'} isCentered={true}>
      <ModalOverlay />
      <ModalContent fontFamily={'Inter'}>
        <ModalHeader>{modalForm.employee && modalForm.employee.id ? 'Editar Empleado' : 'Crear Empleado'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={modalForm.employee ?? new ClassEmployee()}
            validationSchema={validationSchema}
            onSubmit={
              modalForm.employee && modalForm.employee.id
                ? (employee, actions) => {
                    updateEmployee({ employee, actions, toast, closeModal })
                  }
                : (employee, actions) => {
                    addEmployee({ employee, actions, toast, closeModal })
                  }
            }
          >
            {(props: FormikProps<IEmployee>) => (
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
