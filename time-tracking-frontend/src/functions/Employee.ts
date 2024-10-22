import { EmployeeResponse, EmployeeStatus, IEmployee } from '../models/iEmployee'

export function employeesCamelCase(employees: EmployeeResponse[]): IEmployee[] {
  return employees.map((employee) => ({
    ...employee,
    status: employee.status as EmployeeStatus,
    createdAt: employee.created_at ? new Date(employee.created_at) : null,
    updatedAt: employee.updated_at ? new Date(employee.updated_at) : null,
    lastName: employee.lastname,
    faceImagePath: employee.face_image_path,
    faceEncoding: employee.face_encoding,
    positionId: employee.position_id,
  }))
}

export function employeeCamelCase(employee: EmployeeResponse): IEmployee {
  return {
    ...employee,
    status: employee.status as EmployeeStatus,
    createdAt: employee.created_at ? new Date(employee.created_at) : null,
    updatedAt: employee.updated_at ? new Date(employee.updated_at) : null,
    lastName: employee.lastname,
    faceImagePath: employee.face_image_path,
    faceEncoding: employee.face_encoding,
    positionId: employee.position_id,
  }
}
