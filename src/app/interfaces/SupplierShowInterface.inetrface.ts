export interface SupplierShowInterface {
    supplier: Supplier
  }
  
  export interface Supplier {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }