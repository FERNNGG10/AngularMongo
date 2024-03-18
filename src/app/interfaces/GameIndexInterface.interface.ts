export interface GameIndexInterface {
    games: Game[]
  }
  
  export interface Game {
    id:number
    game: string
    stock: number
    category: string
    classification: string
    developer: string
    supplier: string
    price: number
  }

  export interface CategoriesSelectInterface {
    categories: Category[]
  }
  
  export interface Category {
    id: number
    category: string
    status: number
  }

  export interface ClassificationsSelectInterface {
    classifications: Classification[]
  }
  
  export interface Classification {
    id: number
    classification: string
    status: number
  }

  export interface DevelopersSelectInterface {
    developers: Developer[]
  }
  
  export interface Developer {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }

  export interface SuppliersSelectInterface {
    suppliers: Supplier[]
  }
  
  export interface Supplier {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }

export interface GameDataInterface {
  name:string,
  description:string,
  price:number,
  stock:number,
  category_id:number,
  supplier_id:number,
  classification_id:number,
  developer_id:number

}

export interface Root {
  msg: string
  game: GameResponseInterface
}

export interface GameResponseInterface {
  name: string
  description: string
  category_id: string
  classification_id: string
  developer_id: string
  supplier_id: string
  id: number
}
  
  
  