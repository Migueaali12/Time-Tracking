export interface Employee {
  id: number
  status: 'ACTIVE' | 'INACTIVE'
  name: string
  lastName: string
  dni: string
  phone: string
  email: string
  faceImagePath: string
  faceEncoding: string
  positionId: number
  createdAt: Date
  updatedAt: Date
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
