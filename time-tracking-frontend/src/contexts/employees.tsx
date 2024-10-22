import { createContext, useReducer } from 'react'
import { employeeReducer, initialState } from '../reducers/employees'
import { FAddEmployee, FDeleteEmployee, FSetEmployees, FUpdateEmployee } from '../services/Employee'
import { ToastId, UseToastOptions } from '@chakra-ui/react'
import { IEmployee } from '../models/iEmployee';
import { employeeCamelCase, employeesCamelCase } from '../functions/Employee'
import { FormikHelpers } from 'formik'

type EmployeeContextType = {
  employees: IEmployee[]
  setEmployees: () => void
  addEmployee: (employee: IEmployee) => void
  deleteEmployee: (id: number) => void
  updateEmployee: ({ employee, actions, toast }: UpdateEmployee) => void
}

type UpdateEmployee = {
  employee: IEmployee
  actions: FormikHelpers<IEmployee>
  toast: (options?: UseToastOptions) => ToastId
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeReducer = (): {
  employees: IEmployee[]
  setEmployees: () => void
  addEmployee: (employee: IEmployee) => void
  deleteEmployee: (id: number) => void
  updateEmployee: ({ employee, actions, toast }: UpdateEmployee) => void
} => {
  const [{ employees }, dispatch] = useReducer(employeeReducer, initialState)

  const setEmployees = () => {
    FSetEmployees()
      .then((employees) => {
        if (employees !== undefined) {
          dispatch({ type: 'SET_EMPLOYEES', payload: { employees: employeesCamelCase(employees) } })
        }
      })
      // .catch((error) => {
      //   showToast({ toast, title: 'Error al cargar empleados', description: error, status: 'error' })
      // })
  }

  const addEmployee = (employee: IEmployee) => {
    FAddEmployee(employee)
      .then((employee) => {
        if (employee !== undefined) {
          dispatch({ type: 'ADD_EMPLOYEE', payload: { employee: employeeCamelCase(employee) } })
          // showToast({ toast, title: 'Emploeado creado', description: undefined, status: 'success' })
        }
      })
      // .catch((error) => {
      //   showToast({ toast, title: 'Error al crear empleado', description: error, status: 'error' })
      // })
  }

  const deleteEmployee = (id: number) => {
    FDeleteEmployee(id)
      .then((status) => {
        if (status === 200) {
          dispatch({ type: 'DELETE_EMPLOYEE', payload: { id } })
          // showToast({ toast, title: 'Empleado eliminado', description: undefined, status: 'success' })
        }
      })
      // .catch((error) => {
      //   showToast({ toast, title: 'Error al eliminar empleado', description: error, status: 'error' })
      // })
  }

  const updateEmployee = ({ employee, actions, toast }: UpdateEmployee) => {
    FUpdateEmployee({employee, actions, toast})
    .then((employees) => {
      if (employees) {
        dispatch({ type: 'ADD_EMPLOYEE', payload: { employee: employeeCamelCase(employees) } })
      }
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
