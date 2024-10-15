import { useContext } from 'react'
import { EmployeeContext } from '../contexts/employee'

export const useEmployee = () => {
  const context = useContext(EmployeeContext)

  if (!context) throw new Error('useEmployee requires a context provider')

  return context
}
