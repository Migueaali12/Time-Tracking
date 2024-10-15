import { getAuthToken } from '../functions/Token'
import { Employee } from '../types'

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

export async function FAddEmployee(employee: Employee) {
  const res = await fetch(`${URL_API}/add`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      status: employee.status,
      name: employee.name,
      lastName: employee.lastName,
      dni: employee.dni,
      phone: employee.phone,
      email: employee.email,
      faceImagePath: employee.faceImagePath,
      faceEncoding: employee.faceEncoding,
      position_id: employee.positionId,
    }),
  })

  const data = await res.json()

  return data.employees
}

export async function FDeleteEmployee(id: number) {
  const res = await fetch(`${URL_API}/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      id: id,
    }),
  })

  const data = await res.json()

  return data.status
}

export async function FUpdateEmployee(employee: Employee) {
    const res = await fetch(`${URL_API}/update`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: employee.id,
        status: employee.status,
        name: employee.name,
        lastName: employee.lastName,
        dni: employee.dni,
        phone: employee.phone,
        email: employee.email,
        faceImagePath: employee.faceImagePath,
        faceEncoding: employee.faceEncoding,
        position_id: employee.positionId,
      }),
    })

    const data = await res.json()

    return data.status
}
