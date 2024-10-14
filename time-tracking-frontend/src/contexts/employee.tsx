import { createContext, useReducer } from 'react'
import { Employee } from '../types'
import { employeeReducer, initialState } from '../reducers/employees'

type EmployeeContextType = {
  employees: Employee[]
  setEmployees: () => void
  addEmployee: (employee: Employee) => void
  deleteEmployee: (id: number) => void
  updateEmployee: (employee: Employee) => void
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeReducer = (): {
  employees: Employee[]
  setEmployees: () => void
  addEmployee: (employee: Employee) => void
  deleteEmployee: (id: number) => void
  updateEmployee: (employee: Employee) => void
} => {
  const [{ employees }, dispatch] = useReducer(employeeReducer, initialState)

  const setEmployees = () => {
    //fetch al api
    dispatch({ type: 'SET_EMPLOYEES', payload: { employees } })
  }

  const addEmployee = (employee: Employee) => {
    // fetch al api
    dispatch({ type: 'ADD_EMPLOYEE', payload: { employee } })
  }

  const deleteEmployee = (id: number) => {
    // fetch al api
    dispatch({ type: 'DELETE_EMPLOYEE', payload: { id } })
  }

  const updateEmployee = (employee: Employee) => {
    // fetch al api
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: { employee } })
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
