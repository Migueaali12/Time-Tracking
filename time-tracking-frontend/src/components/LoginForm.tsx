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
    email: string().required('El email es requerido'),
    password: string().required('La contraseña es requerida'),
  })

  return (
    <section>
      <Card width={'sm'} height={'md'} alignItems={'center'}>
        <CardBody>
          <h1 className="font-semibold text-2xl p-5 justify-self-center">Time Tracking</h1>
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log(values, actions)
            }}
          >
            {(props: FormikProps<{ email: string; password: string; rememberMe: boolean }>) => (
              <Form>
                {/* email */}
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} placeholder="correo electrónico" />
                      <FormErrorMessage>{form.errors.email?.toString()}</FormErrorMessage>
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
