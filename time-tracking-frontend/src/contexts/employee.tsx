import { createContext, useReducer } from 'react'
import { Employee } from '../types'
import { employeeReducer, initialState } from '../reducers/employees'
import { FAddEmployee, FDeleteEmployee, FSetEmployees, FUpdateEmployee } from '../services/Employee'
import { ToastId, useToast, UseToastOptions } from '@chakra-ui/react'

type EmployeeContextType = {
  employees: Employee[]
  setEmployees: () => void
  addEmployee: (employee: Employee) => void
  deleteEmployee: (id: number) => void
  updateEmployee: (employee: Employee) => void
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null)

type ToastProps = {
  toast: (options?: UseToastOptions) => ToastId
  title: string
  description: string | undefined
  status: 'info' | 'warning' | 'error' | 'success'
}

function showToast({ toast, title, description, status }: ToastProps) {
  if (description !== undefined) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  } else {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeReducer = (): {
  employees: Employee[]
  setEmployees: () => void
  addEmployee: (employee: Employee) => void
  deleteEmployee: (id: number) => void
  updateEmployee: (employee: Employee) => void
} => {
  const [{ employees }, dispatch] = useReducer(employeeReducer, initialState)
  const toast = useToast()

  const setEmployees = () => {
    FSetEmployees()
      .then((employees) => {
        if (employees !== undefined) {
          dispatch({ type: 'SET_EMPLOYEES', payload: { employees } })
        }
      })
      .catch((error) => {
        showToast({ toast, title: 'Error al cargar empleados', description: error, status: 'error' })
      })
  }

  const addEmployee = (employee: Employee) => {
    FAddEmployee(employee)
      .then((employee) => {
        if (employee !== undefined) {
          dispatch({ type: 'ADD_EMPLOYEE', payload: { employee } })
          showToast({ toast, title: 'Emploeado creado', description: undefined, status: 'success' })
        }
      })
      .catch((error) => {
        showToast({ toast, title: 'Error al crear empleado', description: error, status: 'error' })
      })
  }

  const deleteEmployee = (id: number) => {
    FDeleteEmployee(id)
      .then((status) => {
        if (status === 200) {
          dispatch({ type: 'DELETE_EMPLOYEE', payload: { id } })
          showToast({ toast, title: 'Empleado eliminado', description: undefined, status: 'success' })
        }
      })
      .catch((error) => {
        showToast({ toast, title: 'Error al eliminar empleado', description: error, status: 'error' })
      })
  }

  const updateEmployee = (employee: Employee) => {
    FUpdateEmployee(employee).then((status) => {
      if (status === 200) {
        dispatch({ type: 'UPDATE_EMPLOYEE', payload: { employee } })
        showToast({ toast, title: 'Empleado actualizado', description: undefined, status:'success' })
      }
    })
     .catch((error) => {
        showToast({ toast, title: 'Error al actualizar empleado', description: error, status: 'error' })
      })
  }

  return { employees, setEmployees, addEmployee, deleteEmployee, updateEmployee }
}

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const { employees, setEmployees, addEmployee, deleteEmployee, updateEmployee } = useEmployeeReducer()

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, deleteEmployee, updateEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}
