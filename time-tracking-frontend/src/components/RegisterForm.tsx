import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import { object, ref, string } from 'yup'
import { registerUser } from '../services/User'
import { useAlert } from '../hooks/Alert'

export interface RegisterFormProps {
  name: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
}

export function RegisterForm() {
  const validationSchema = object({
    name: string().required('El primer nombre es requerido'),
    lastName: string().required('El apellido es requerido'),
    email: string().required('El email es requerido').email('Debe ser un email válido'),
    password: string()
      .required('La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/\d/, 'Debe contener al menos un número'),
    //.matches(/[@$!%*#?&]/, 'Debe contener al menos un carácter especial'),
    passwordConfirm: string()
      .oneOf([ref('password'), undefined], 'Las contraseñas no coinciden')
      .required('La confirmación es requerida'),
  })
  
  const { setAlert, AlertComponent } = useAlert()

  return (
    <section>
      <Card width={'3xl'} height={'fit-content'} alignItems={'center'}>
        <CardBody>
          <h1 className="font-semibold text-2xl p-5 justify-self-center italic">Time Tracking</h1>
          <Formik
            initialValues={{ name: '', lastName: '', email: '', password: '', passwordConfirm: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              registerUser({ values, actions, setAlert })
            }}
          >
            {(props: FormikProps<RegisterFormProps>) => (
              
              <Form>
                <main className="sm:flex gap-10">
                  <Flex flexDirection={'column'}>
                    <Field name="name">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                          <FormLabel>Nombre</FormLabel>
                          <Input {...field} placeholder="Tu nombre" />
                          <FormErrorMessage>{form.errors.name?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastName">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.lastName && !!form.touched.lastName}>
                          <FormLabel>Apellido</FormLabel>
                          <Input {...field} placeholder="Tu apellido" />
                          <FormErrorMessage>{form.errors.lastName?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} placeholder="correo electrónico" />
                          <FormErrorMessage>{form.errors.email?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex flexDirection={'column'} justifyContent={'center'}>
                    <Field name="password">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.password && !!form.touched.password} mt={4}>
                          <FormLabel>Contraseña</FormLabel>
                          <Input {...field} type="password" placeholder="contraseña" />
                          <FormErrorMessage>{form.errors.password?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="passwordConfirm">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={!!form.errors.passwordConfirm && !!form.touched.passwordConfirm} mt={4}>
                          <FormLabel>Confirma tu contraseña</FormLabel>
                          <Input {...field} type="password" placeholder="confirma tu contraseña" />
                          <FormErrorMessage>{form.errors.passwordConfirm?.toString()}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </main>

                {AlertComponent}

                <CardFooter display={'flex'} flexDirection={'column'}>
                  <Button mt={4} colorScheme="blue" isLoading={props.isSubmitting} type="submit">
                    Registrate
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </section>
  )
}
