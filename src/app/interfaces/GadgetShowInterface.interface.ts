export interface GadgetShowInterface {
    gadget: Gadget
  }
  
  export interface Gadget {
    id: number
    name: string
    description: string
    status: number
    supplier_id: number
    gadget_inventory: GadgetInventory
    supplier: Supplier
  }
  
  export interface GadgetInventory {
    id: number
    gadget_id: number
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