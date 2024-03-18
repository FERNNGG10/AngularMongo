export interface GadgetIndexInterface {
    gadgets: Gadget[]
  }
  
  export interface Gadget {
    id: number
    gadget: string
    description: string
    stock: number
    price: string
    supplier: string
  }

  export interface GadgetDataInterface {
    name: string
    stock: number
    price: number
    description: string
    supplier_id: number
  }

  export interface Root {
    gadgets: GadgetResponse[]
  }
  
  export interface GadgetResponse {
    gadget: string
    description: string
    stock: number
    price: string
    supplier: string
  }