import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
  method: { type: String, enum: ['mpesa', 'stripe'], required: true },
  amount: { type: Number, required: true },
  phoneNumber: String,
  name: String,
  email: String,
  address: String,
  mpesaCheckoutRequestID: String,
  mpesaResponse: Object,
  stripeSessionID: String,
  stripeCustomerID: String,
  cartItems: Array,
  status: { type: String, default: 'pending' }, // success | failed | cancelled
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)
