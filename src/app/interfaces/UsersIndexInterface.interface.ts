export interface UserIndexInterface {
    users: User[]
  }
  
  export interface User {
    id: number
    name: string
    email: string
    email_verified_at: any
    status: number
    created_at?: string
    updated_at: string
    rol_id: number
  }

export interface UserDataInterface {
    name: string
    email: string
    password: string
    password_confirmation: string
    rol_id: number
}

export interface Root {
    msg: string
    data: Data   
}

export interface Data {
    name: string
    email: string
    updated_at: string
    created_at: string
    id: number
  }

  export interface RolesS {
    roles: Role[]
  }
  
  export interface Role {
    id: number
    role: string
  }