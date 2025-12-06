import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: [1886, 'Год не может быть раньше изобретения автомобиля'],
    max: [new Date().getFullYear() + 1, 'Год не может быть из далёкого будущего'],
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: [1, 'Цена за день должна быть положительной'],
  },
  image: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', // дефолтная картинка
  },
  available: {
    type: Boolean,
    default: true,
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual', 'Semi-Automatic'],
    default: 'Automatic',
  },
  fuelType: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true,
    min: [2, 'Минимум 2 места'],
    max: [20, 'Слишком много мест для обычного авто'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Описание не должно превышать 500 символов'],
  },
}
);


export const Car = mongoose.model("Car", CarSchema);

