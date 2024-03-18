export interface DlcShowInterface {
    dlc: Dlc
  }
  
  export interface Dlc {
    id: number
    name: string
    game_id: number
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
  }