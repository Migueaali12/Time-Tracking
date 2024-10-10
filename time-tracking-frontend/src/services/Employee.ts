import { getAuthToken } from "../functions/Token"

const URL_API='http://127.0.0.1:8000/api/employee/'

export async function getEmployees() {
    const res = await fetch(`${URL_API}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
    })
    
    const data = await res.json()

    if (data.status === 200) {
        return data.employees
    }
    
    throw new Error('Error al obtener los empleados')
}