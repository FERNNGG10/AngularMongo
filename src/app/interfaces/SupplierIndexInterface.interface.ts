export interface SupplierIndexInterface {
    suppliers: Supplier[]
  }
  
  export interface Supplier {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }

  export interface SupplierDataInterface {
    name:string,
    email:string,
    phone:string
  }
  
  export interface Root {
    msg: string
    supplier: SupplierResponse
  }
  
  export interface SupplierResponse {
    name: string
    email: string
    phone: string
    id: number
  }
  