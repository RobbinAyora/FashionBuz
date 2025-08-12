import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string; // base64 or URL string
  sale?: boolean;
  category?: 'featured' | 'new' | 'popular';
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  sale: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ['featured', 'new', 'popular'], // lowercase enum values to match frontend
    default: 'featured',
  },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;





