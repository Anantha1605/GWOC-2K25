// /src/models/Booking.ts
import mongoose, { Schema, model, models } from 'mongoose';

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    remark: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    serviceProviderId: { type: Schema.Types.ObjectId, ref: 'Partner', default: null },
    serviceProviderName: { type: String, default: "" },
    serviceProviderContact: { type: String, default: "" },
    // NEW: Track providers who have removed this order from their view
    ignoredProviders: [{ type: Schema.Types.ObjectId, ref: 'Partner', default: [] }],
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model('Booking', bookingSchema);
export default Booking;
