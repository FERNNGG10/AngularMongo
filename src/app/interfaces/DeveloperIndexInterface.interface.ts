export interface DeveloperIndexInterface {
    developers: Developer[]
  }
  
  export interface Developer {
    id: number
    name: string
    email: string
    phone: string
    status: number
  }

  export interface DeveloperDataInterface {
    name:string,
    email:string,
    phone:string
  }

  export interface Root {
    msg: string
    developer: Developer
  }
  
  export interface DeveloperResponseInterface {
    name: string
    email: string
    phone: string
    id: number
  }