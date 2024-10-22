import { FormikHelpers } from 'formik'
import { getAuthToken } from '../functions/Token'
import { IEmployee } from '../models/iEmployee'
import { ToastId, UseToastOptions } from '@chakra-ui/react'
import { showToast } from '../functions/Toasts'

const URL_API = 'http://127.0.0.1:8000/api/employee'

export async function FSetEmployees() {
  const res = await fetch(`${URL_API}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })

  const data = await res.json()

  return data.employees
}

export async function FAddEmployee(employee: IEmployee) {
  const res = await fetch(`${URL_API}/add`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      status: employee.status,
      name: employee.name,
      lastname: employee.lastName,
      dni: employee.dni,
      phone: employee.phone,
      email: employee.email,
      face_image_path: employee.faceImagePath,
      face_encoding: employee.faceEncoding,
      position_id: employee.positionId,
    }),
  })

  const data = await res.json()

  return data.employees
}

export async function FDeleteEmployee(id: number) {
  const res = await fetch(`${URL_API}/delete`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      employee_id: id,
    }),
  })

  const data = await res.json()

  return data.status
}

interface UpdateProps {
  employee: IEmployee
  actions: FormikHelpers<IEmployee>
  toast: (options?: UseToastOptions) => ToastId
}

export async function FUpdateEmployee({ employee, actions, toast }: UpdateProps) {
  try {
    const res = await fetch(`${URL_API}/update/${employee.id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        status: employee.status,
        name: employee.name,
        lastname: employee.lastName,
        dni: employee.dni,
        phone: employee.phone,
        email: employee.email,
        face_image_path: employee.faceImagePath,
        face_encoding: employee.faceEncoding,
        position_id: employee.positionId,
      }),
    })

    const data = await res.json()

    if (res.ok && data.status === 200) {
      actions.resetForm()
      showToast({ toast, title: 'Empleado actualizado', description: undefined, status: 'success' })
      return data.employees
    } else {
      showToast({ toast, title: 'Error', description: data.message, status: 'error' })
      return null
    }
  } catch {
    showToast({ toast, title: 'Error', description: 'Error de conexión, intente más tarde', status: 'error' })
  }
  actions.setSubmitting(false)
}
