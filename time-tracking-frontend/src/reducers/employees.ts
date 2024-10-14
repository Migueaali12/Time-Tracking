import { Employee } from '../types'

interface State {
  employees: Employee[]
}

type Action =
  | { type: 'SET_EMPLOYEES'; payload: { employees: Employee[] } }
  | { type: 'ADD_EMPLOYEE'; payload: { employee: Employee } }
  | { type: 'UPDATE_EMPLOYEE'; payload: { employee: Employee } }
  | { type: 'DELETE_EMPLOYEE'; payload: { id: number } }

export const initialState: State = {
  employees: [],
}

export const employeeReducer = (state: State, action: Action) => {
  if (action.type === 'SET_EMPLOYEES') {
    const { employees } = action.payload
    return {
      ...state,
      employees,
    }
  }

  if (action.type === 'ADD_EMPLOYEE') {
    return {
      ...state,
      employees: [...state.employees, action.payload.employee],
    }
  }

  if (action.type === 'UPDATE_EMPLOYEE') {
    const newState = [...state.employees]
    const employeeIndex = newState.findIndex((employee) => employee.id === action.payload.employee.id)
    if (employeeIndex !== -1) {
      newState[employeeIndex] = action.payload.employee
    }
    return {
      ...state,
      employees: newState,
    }
  }

  if (action.type === 'DELETE_EMPLOYEE') {
    return {
      ...state,
      employees: state.employees.filter((employee) => employee.id !== action.payload.id),
    }
  }

  return state
}


