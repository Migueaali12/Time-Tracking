import { Button, Card, CardBody, CardFooter, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import { object, string } from 'yup'
import { useAlert } from '../hooks/Alert'
import { loginUser } from '../services/User'
import { LoginLayout } from './Layaout'

export function LoginForm() {
  const validationSchema = object({
    email: string().required('El email es requerido'),
    password: string().required('La contraseña es requerida'),
  })

  const { setAlert, AlertComponent } = useAlert()

  return (
      <LoginLayout>
      <Card width={'md'} height={'md'} alignItems={'center'}>
        <CardBody width={'85%'}>
          <h1 className="font-semibold text-2xl p-5 justify-self-center italic">Time Tracking</h1>
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              loginUser({ values, actions, setAlert })
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

                {AlertComponent}

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
