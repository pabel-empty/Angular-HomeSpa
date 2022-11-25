export interface PricingInterface {
  title: string
  planType: string
  state: string
  plans: Plan[]
  _id: string
  createdAt: string
  __v: number
}

export interface Plan {
  title: string
  description: string
  price: number
  _id?: string
}
