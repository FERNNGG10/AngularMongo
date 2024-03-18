export interface ConsoleIndexInterface {
    consoles: Console[]
  }
  
  export interface Console {
    id: number
    console: string
    description: string
    stock: number
    price: string
    supplier: string
  }
  
    export interface ConsoleDataInterface {
        name: string
        description: string
        stock: number
        price: number
        supplier_id: number
}

export interface Root {
    msg: string
    console: Console
  }
  
  export interface ConsoleResponseInterface {
    name: string
    description: string
    supplier_id: number
    id: number
  }