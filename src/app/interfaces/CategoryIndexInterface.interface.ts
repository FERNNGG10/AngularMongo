export interface CategoryIndexInterface {
    categories: Category[]
  }
  
  export interface Category {
    id: number
    category: string
    status: number
  }


export interface CategoryDataInterface {
  category:string,
}

export interface Root {
  msg: string
  category: CategoryResponse
}

export interface CategoryResponse {
  category: string
  id: number
}
