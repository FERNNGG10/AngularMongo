export interface PaymenthIndexInterface {
    payment_methods: PaymentMethod[]
  }
  
  export interface PaymentMethod {
    id: number
    method: string
    status: number
  }

export interface PaymentDataInterface {
    method: string
    
}

export interface Root {
    msg: string
    payment_method: PaymentResponseInterface
  }
  
  export interface PaymentResponseInterface {
    name: string
    id: number
  }