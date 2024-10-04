
import { FormikHelpers } from 'formik'
import { UserAlert } from '../hooks/Alert'

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
  setAlert: React.Dispatch<React.SetStateAction<UserAlert>>
}

interface LoginProps {
  values: {
    email: string
    password: string
  }
  actions: FormikHelpers<{
    email: string;
    password: string;
    rememberMe: boolean;
}>
  setAlert: React.Dispatch<React.SetStateAction<UserAlert>>
}

const URL_API = 'http://127.0.0.1:8000/api/user'

export async function registerUser({ values, actions, setAlert }: RegisterProps) {
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
      setAlert({ hidden: false, type: 'success', content: data.message })
      actions.resetForm()
    } else {
      setAlert({ hidden: false, type: 'error', content: data.message || 'Error al registrar' })
    }
  } catch {
    setAlert({ hidden: false, type: 'error', content: 'Error de conexión, intente más tarde' })
  }
  actions.setSubmitting(false)
}

export async function loginUser({ values, actions, setAlert }: LoginProps) {
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

    if(res.ok) {
      setAlert({ hidden: false, type: 'success', content: data.message })
      actions.resetForm()
    } else {
      setAlert({ hidden: false, type: 'error', content: data.message || 'Error al inciar sesión' })
    }
  } catch {
    setAlert({ hidden: false, type: 'error', content: 'Error de conexión, intente más tarde' })
  }
  actions.setSubmitting(false)
}
