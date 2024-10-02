import { Button, Card, CardBody, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';

interface Login {
    username: string;
    password: string;
    rememberMe: boolean;
}
export function LoginForm() {
    const loginValidation = ({username, password } : Login) => {
        let error
        if (!username) {
            error = 'El nombre de usuario es requerido'
        } else if (!password) {
            error = 'La contraseña es requerida'
        }
        return error
    }

  return (
    <section>
      <Card width={'sm'} height={'sm'} alignItems={'center'}>
        <CardBody>
            <h1 className='font-semibold text-xl'>Time Tracking</h1>
            <Formik
        initialValues={{ username: '', password: '', rememberMe: false }}
        onSubmit={(values, actions) => {
          console.log(values, actions)
        }}
      >
        {(props: FormikProps<{ username: string, password: string, rememberMe: boolean }>) => (
          <Form>

            {/* Username */}
            <Field name="username" validate={loginValidation}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.username && !!form.touched.username}
                >
                  <FormLabel>Nombre de usuario</FormLabel>
                  <Input {...field} placeholder="nombre de usuario" />
                  <FormErrorMessage>
                    {form.errors.username?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Password */}
            <Field name="password" validate={loginValidation}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.password && !!form.touched.password}
                  mt={4}
                >
                  <FormLabel>Contraseña</FormLabel>
                  <Input {...field} placeholder="contraseña" />
                  <FormErrorMessage>
                    {form.errors.text?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
            mt={4}
            colorScheme='blue'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Iniciar sesión
          </Button>
          </Form>
        )}
      </Formik>
        </CardBody>
      </Card>
    </section>
  )
}
