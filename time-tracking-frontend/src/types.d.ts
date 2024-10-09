export interface Employee {
  id: number
  status: string
  name: string
  lastName: string
  dni: string
  phone: string
  email: string
  faceImagePath: string
  faceEncoding: string
  position: string
  createdAt: Date
  updatedAt: Date
}

export interface EmployeeResponse {
    id: number;
    status: string;
    name: string;
    lastname: string;
    dni: string;
    phone: string;
    email: string;
    face_image_path: string;
    face_encoding: string;
    position_id: number;
    created_at: string;
    updated_at: string;
}