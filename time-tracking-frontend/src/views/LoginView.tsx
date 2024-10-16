import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import { object, string } from 'yup'
import { LoginLayout } from '../layouts/LoginLayaout'
import { loginUser } from '../services/User'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const validationSchema = object({
    email: string().required('El email es requerido'),
    password: string().required('La contraseña es requerida'),
  })

  const toast = useToast()
  const navigate = useNavigate()

  return (
    <LoginLayout>
      <Card width={'md'} height={'md'} alignItems={'center'}>
        <CardBody width={'85%'}>
          <h1 className="font-semibold text-2xl p-5 justify-self-center italic">Time Tracking</h1>
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              loginUser({ values, actions, toast, navigate })
            }}
          >
            {(props: FormikProps<{ email: string; password: string; rememberMe: boolean }>) => (
              <Form>
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} placeholder="correo electrónico" />
                      <FormErrorMessage>{form.errors.email?.toString()}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!form.errors.password && !!form.touched.password} mt={4}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input {...field} type="password" placeholder="contraseña" />
                      <FormErrorMessage>{form.errors.password?.toString()}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <CardFooter display={'flex'} flexDirection={'column'}>
                  <Button mt={4} colorScheme="blue" isLoading={props.isSubmitting} type="submit">
                    Iniciar sesión
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </LoginLayout>
  )
}
