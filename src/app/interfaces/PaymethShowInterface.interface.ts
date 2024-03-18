export interface PaymentMethodShowInterface {
    payment_method: PaymentMethod
  }
  
  export interface PaymentMethod {
    id: number
    method: string
    status: number
  }