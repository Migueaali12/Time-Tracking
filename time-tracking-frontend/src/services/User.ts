import { FormikHelpers } from 'formik'
import { UseToastOptions, ToastId } from '@chakra-ui/react'
import CryptoJS from 'crypto-js'
import { NavigateFunction } from 'react-router-dom'
import { getAuthToken } from '../functions/Token'
import { showToast } from '../functions/Toasts'

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

    if (res.ok && data.status === 200) {
      showToast({ toast, title: 'Usuario registrado', status: 'success' })
      actions.resetForm()
    } else {
      showToast({ toast, title: 'Error al registar usuario', description: data.message, status: 'error' })
    }
  } catch (err) {
    showToast({
      toast,
      title: 'Error al registrar usuario',
      description: `Error no especificado: ${err}`,
      status: 'error',
    })
  }
  actions.setSubmitting(false)
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
  navigate: NavigateFunction
}

export async function loginUser({ values, actions, toast, navigate }: LoginProps) {
  try {
    const res = await fetch(`${URL_API}/login`, {
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

    if (res.ok && data.status === 200) {
      const encryptedToken = CryptoJS.AES.encrypt(data.token, import.meta.env.VITE_REACT_APP_KEY).toString()
      localStorage.setItem('authToken', encryptedToken)
      showToast({ toast, title: 'Inicio de sesión exitoso!', status: 'success' })
      actions.resetForm()

      if (data.role === 'ADMIN') {
        navigate('/admin-dashboard')
      } else {
        navigate('/user-dashboard')
      }
    } else {
      showToast({ toast, title: 'Error al inciar sesión', description: data.message, status: 'error' })
    }
  } catch (err) {
    showToast({ toast, title: 'Error al inciar sesión', description: `Error no especificado: ${err}`, status: 'error' })
  }
  actions.setSubmitting(false)
}

export async function logoutUser({
  toast,
  navigate,
}: {
  toast: (options?: UseToastOptions) => ToastId
  navigate: NavigateFunction
}) {
  try {
    const res = await fetch(`${URL_API}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    const data = await res.json()

    if (data.status === 200) {
      localStorage.removeItem('authToken')
      showToast({ toast, title: 'Sesión cerrada', description: data.message, status: 'success' })
      navigate('/login')
    } else {
      showToast({ toast, title: 'Error al cerrar sesión', description: data.message, status: 'error' })
    }
  } catch (err) {
    showToast({ toast, title: 'Error al cerrar sesión', description: `Error no especificado: ${err}`, status: 'error' })
  }
}
