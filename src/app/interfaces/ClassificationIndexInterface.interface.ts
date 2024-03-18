export interface ClassificationIndexInterface {
    classifications: Classification[]
  }
  
  export interface Classification {
    id: number
    classification: string
    status: number
  }
  export interface Root {
    classification: ClassificationResponseInterface
  }
  
  export interface ClassificationResponseInterface	 {
    classification: string
    id: number
  }

  export interface ClassificationDataInterface {
    classification: string
  }
  