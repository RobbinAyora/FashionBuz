import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    sale: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ['featured', 'feop', 'upcoming'],
      default: 'featured',
    },
  },
  { timestamps: true }
)

const Products = mongoose.models.Products || mongoose.model('Products', productSchema)

export default Products



