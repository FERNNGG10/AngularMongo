export interface ReviewsIndexInterface {
    reviews: Review[]
  }
  
export interface Review {
    id: number
    review: string
    user: string
    game: string
}
  
export interface ReviewDataInterface {
    comment: string
    game_id: number
}

export interface Root {
    msg: string
    review: ReviewResponse	
  }
  
  export interface ReviewResponse {
    comment: string
    game_id: string
    user_id: number
    id: number
  }


  export interface JUEGOS {
    games: Game[]
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
  }
  