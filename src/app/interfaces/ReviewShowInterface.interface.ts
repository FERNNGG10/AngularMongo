export interface ReviewShowInterface {
    review: Review
  }
  
  export interface Review {
    id: number
    comment: string
    user_id: number
    game_id: number
    game: Game
    user: User
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
  
  export interface User {
    id: number
    name: string
    email: string
    email_verified_at: any
    status: number
    rol_id: number
    created_at: any
    updated_at: string
  }