import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import { object, string } from 'yup'


export function LoginForm() {
  const validationSchema = object({
    username: string().required('El nombre de usuario es requerido'),
    password: string().required('La contraseña es requerida'),
  })

  return (
    <section>
      <Card width={'sm'} height={'md'} alignItems={'center'}>
        <CardBody>
          <h1 className="font-semibold text-2xl p-5 justify-self-center">Time Tracking</h1>
          <Formik
            initialValues={{ username: '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log(values, actions)
            }}
          >
            {(props: FormikProps<{ username: string; password: string; rememberMe: boolean }>) => (
              <Form>
                {/* Username */}
                <Field name="username">
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!form.errors.username && !!form.touched.username}>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <Input {...field} placeholder="nombre de usuario" />
                      <FormErrorMessage>{form.errors.username?.toString()}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Password */}
                <Field name="password">
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!form.errors.password && !!form.touched.password} mt={4}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input {...field} type="password" placeholder="contraseña" />
                      <FormErrorMessage>{form.errors.password?.toString()}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="rememberMe" type="checkbox">
                  {({ field }: FieldProps) => (
                    <Checkbox {...field} mt={4}>
                      Recuérdame
                    </Checkbox>
                  )}
                </Field>

                <CardFooter display={'flex'} flexDirection={'column'}>
                  {/* Submit Button */}
                  <Button mt={4} colorScheme="blue" isLoading={props.isSubmitting} type="submit">
                    Iniciar sesión
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
