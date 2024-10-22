import { FormikHelpers } from 'formik'
import { getAuthToken } from '../functions/Token'
import { IEmployee } from '../models/iEmployee'
import { ToastId, UseToastOptions } from '@chakra-ui/react'
import { showToast } from '../functions/Toasts'

const URL_API = 'http://127.0.0.1:8000/api/employee'

interface FetchEmployeeProps {
  employee: IEmployee
  actions: FormikHelpers<IEmployee>
  toast: (options?: UseToastOptions) => ToastId
}

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

export async function FAddEmployee({employee, toast, actions} : FetchEmployeeProps) {
  try {
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
        face_image_path: 'aa',
        face_encoding: 'bb',
        position_id: employee.positionId,
      }),
    })
  
    const data = await res.json()
  
    if (res.ok && data.status === 200) {
      showToast({ toast, title: 'Empleado creado', description: undefined, status: 'success' })
      actions.setSubmitting(false)
      return data.employees
    } else {
      showToast({ toast, title: 'Error al crear empleado', description: data.message, status: 'error' })
      actions.setSubmitting(false)
      return null
    }

  } catch (err) {
    showToast({ toast, title: 'No se pudo crear el empleado', description: `Error no especificado: ${err}`, status: 'error' })
  }
  actions.setSubmitting(false)
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

export async function FUpdateEmployee({ employee, actions, toast }: FetchEmployeeProps) {
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
      showToast({ toast, title: 'Empleado actualizado', description: undefined, status: 'success' })
      actions.setSubmitting(false)
      return data.employees
    } else {
      showToast({ toast, title: 'Error', description: data.message, status: 'error' })
      return null
    }
  } catch (err) {
    showToast({ toast, title: 'No se pudo editar el empleado', description: `Error no especificado: ${err}`, status: 'error' })
  }
  actions.setSubmitting(false)
}
