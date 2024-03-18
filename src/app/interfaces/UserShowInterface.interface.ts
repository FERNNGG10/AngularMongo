export interface UserShowInterface {
    user: User
  }
  
  export interface User {
    id: number
    name: string
    email: string
    email_verified_at: any
    status: number
    rol_id: number
    created_at: any
    updated_at: string
  }

export interface UserDataUpdateInterface {
    name: string;
    email: string;
    password: string | null;
    status:number;
    rol_id: number;
}
