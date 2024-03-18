export interface RegisterDataInterface {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface RegisterResponseInterface {
    msg: string
    data: Data   
}

export interface Data {
    name: string
    email: string
    rol_id: number
    updated_at: string
    created_at: string
    id: number
  }