import { createContext, useReducer } from 'react'
import { employeeReducer, initialState } from '../reducers/employees'
import { FAddEmployee, FDeleteEmployee, FSetEmployees, FUpdateEmployee } from '../services/Employee'
import { ToastId, UseToastOptions } from '@chakra-ui/react'
import { IEmployee } from '../models/iEmployee'
import { employeeCamelCase, employeesCamelCase } from '../functions/Employee'
import { FormikHelpers } from 'formik'

type EmployeeContextType = {
  employees: IEmployee[]
  setEmployees: () => void
  addEmployee: ({ employee, actions, toast, closeModal }: ActionType) => void
  updateEmployee: ({ employee, actions, toast, closeModal }: ActionType) => void
  deleteEmployee: ({ id, toast, setIsLoading, closeAlert }: DeleteType) => void
}

export type ActionType = {
  employee: IEmployee
  actions: FormikHelpers<IEmployee>
  toast: (options?: UseToastOptions) => ToastId
  closeModal: () => void
}

export type DeleteType = {
  id: number
  toast: (options?: UseToastOptions) => ToastId
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  closeAlert: () => void
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeReducer = (): {
  employees: IEmployee[]
  setEmployees: () => void
  addEmployee: ({ employee, actions, toast, closeModal }: ActionType) => void
  updateEmployee: ({ employee, actions, toast, closeModal }: ActionType) => void
  deleteEmployee: ({ id, toast, setIsLoading, closeAlert }: DeleteType) => void
} => {
  const [{ employees }, dispatch] = useReducer(employeeReducer, initialState)

  const setEmployees = () => {
    FSetEmployees().then((employees) => {
      if (employees !== undefined) {
        dispatch({ type: 'SET_EMPLOYEES', payload: { employees: employeesCamelCase(employees) } })
      }
    })
  }

  const addEmployee = ({ employee, actions, toast, closeModal }: ActionType) => {
    FAddEmployee({ employee, actions, toast }).then((employees) => {
      dispatch({ type: 'ADD_EMPLOYEE', payload: { employee: employeeCamelCase(employees) } })
      closeModal()
    })
  }

  const updateEmployee = ({ employee, actions, toast, closeModal }: ActionType) => {
    FUpdateEmployee({ employee, actions, toast }).then((employees) => {
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: { employee: employeeCamelCase(employees) } })
      closeModal()
    })
  }

  const deleteEmployee = ({id, toast, setIsLoading, closeAlert} : DeleteType) => {
    FDeleteEmployee({ id, toast, setIsLoading}).then((status) => {
      if (status === 200) {
        dispatch({ type: 'DELETE_EMPLOYEE', payload: { id } })
        closeAlert()
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
