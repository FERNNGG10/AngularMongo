export interface ConsoleShowInterface {
    console: Console
  }
  
  export interface Console {
    id: number
    name: string
    description: string
    status: number
    supplier_id: number
    console_inventory: ConsoleInventory
    supplier: Supplier
  }
  
  export interface ConsoleInventory {
    id: number
    console_id: number
    stock: number
    price: string
  }
  
  export interface Supplier {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }