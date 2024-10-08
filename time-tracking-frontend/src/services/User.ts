import { FormikHelpers } from 'formik'
import { UseToastOptions, ToastId } from '@chakra-ui/react'

interface RegisterProps {
  values: {
    name: string
    lastName: string
    email: string
    password: string
    passwordConfirm: string
  }
  actions: FormikHelpers<{
    name: string
    lastName: string
    email: string
    password: string
    passwordConfirm: string
  }>
  toast: {
    (options?: UseToastOptions): ToastId
  }
}

interface LoginProps {
  values: {
    email: string
    password: string
  }
  actions: FormikHelpers<{
    email: string
    password: string
    rememberMe: boolean
  }>
  toast: {
    (options?: UseToastOptions): ToastId
  }
}

const URL_API = 'http://127.0.0.1:8000/api/user'

export async function registerUser({ values, actions, toast }: RegisterProps) {
  try {
    const res = await fetch(`${URL_API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirm,
      }),
    })
    const data = await res.json()

    if (res.ok) {
      toast({
        title: 'Usuario registrado',
        description: data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      actions.resetForm()
    } else {
      toast({
        title: 'Error al registar usuario',
        description: data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  } catch {
    toast({
      title: 'Error al registar usuario',
      description: 'Error de conexión, intente más tarde',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
  }
  actions.setSubmitting(false)
}

export async function loginUser({ values, actions, toast }: LoginProps) {
  try {
    const res = await fetch(`${URL_API}/loginin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('authToken', data.token)
      toast({
        title: 'Usuario autenticado',
        description: data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      actions.resetForm()
    } else {
      toast({
        title: 'Error al inciar sesión',
        description: data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  } catch {
    toast({
      title: 'Error al inciar sesión',
      description: 'Error de conexión, intente más tarde',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
  }
  actions.setSubmitting(false)
}
