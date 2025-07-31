export interface Product {
  _id?: string
  name: string
  price: number
  image: string
  sale?: boolean
  category: 'featured' | 'feop' | 'upcoming'
}
