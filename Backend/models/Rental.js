import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',  
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'Дата окончания должна быть после даты начала',
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Цена не может быть отрицательной'],
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active',
  },
}, {
  timestamps: true,
});




RentalSchema.index({ user: 1, status: 1 });

export const  Rental = mongoose.model('Rental', RentalSchema);
