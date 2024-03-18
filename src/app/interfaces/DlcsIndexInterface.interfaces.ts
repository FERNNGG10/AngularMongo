export interface DlcsIndexInterface {
    dlcs: Dlc[]
  }
  
  export interface Dlc {
    id: number
    dlc: string
    game: string
  }

export interface DlcDataInterface {
    name: string
    game_id: number
}

export interface Root {
    msg: string
    dlc: DlcResponseInterface
  }
  
  export interface DlcResponseInterface {
    dlc: string
    game_id: number
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
  