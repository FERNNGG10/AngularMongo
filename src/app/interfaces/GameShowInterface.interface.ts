export interface GameShowInterface {
    game: Game
  }
  
  export interface Game {
    id: number
    name: string
    description: string
    status: number
    category_id: number
    classification_id: number
    developer_id: number
    supplier_id: number
    game_inventory: GameInventory
    category: Category
    classification: Classification
    developer: Developer
    supplier: Supplier
    sales: Sale[]
  }
  
  export interface GameInventory {
    id: number
    game_id: number
    stock: number
    price: string
  }
  
  export interface Category {
    id: number
    category: string
    status: number
  }
  
  export interface Classification {
    id: number
    classification: string
    status: number
  }
  
  export interface Developer {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }
  
  export interface Supplier {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }
  
  export interface Sale {
    id: number
    game_id: number
    user_id: number
    payment_method_id: number
    quantity: number
    total: string
  }
  