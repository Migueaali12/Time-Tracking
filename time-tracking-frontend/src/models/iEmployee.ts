export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IEmployee {
  id: number | null
  status: EmployeeStatus
  name: string
  lastName: string
  dni: string
  phone: string
  email: string
  faceImagePath: string
  faceEncoding: string
  positionId: number
  createdAt: Date | null
  updatedAt: Date | null
}

export class ClassEmployee implements IEmployee {
  id = null
  status = EmployeeStatus.ACTIVE
  name = ''
  lastName = ''
  dni = ''
  phone = ''
  email = ''
  faceImagePath = ''
  faceEncoding = ''
  positionId = 1
  createdAt = null
  updatedAt = null
}

export interface EmployeeResponse {
  id: number
  status: 'ACTIVE' | 'INACTIVE'
  name: string
  lastname: string
  dni: string
  phone: string
  email: string
  face_image_path: string
  face_encoding: string
  position_id: number
  created_at: string
  updated_at: string
}