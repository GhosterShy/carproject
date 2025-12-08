import {Rental} from '../models/Rental.js';
import {Car} from '../models/Car.js';

import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import authenticateJWT from '../middle.js'


const router = express.Router();

router.post('/create', authenticateJWT, async (req, res) => {
  try {
    const { carId, startDate, endDate,totalPrice } = req.body;
    const userId = req.user.id;  

 
    const car = await Car.findById(carId);
    if (!car || !car.available) {
      return res.status(400).json({ success: false, message: 'Автомобиль недоступен' });
    }



    const rental = new Rental({
      user: userId,
      car: carId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice:totalPrice,
    });
    await rental.save();

   
    car.available = false;
    await car.save();

    res.status(201).json({ success: true, rental });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ошибка при создании аренды', error: error.message });
    console.log(error)
  }
});


router.get('/getRental', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const rentals = await Rental.find({ user: userId })
      .populate('car', 'brand model year image pricePerDay description')  
      .sort({ startDate: -1 });  

    res.json({ success: true, count: rentals.length, rentals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ошибка при получении аренд', error: error.message });
  }
});





router.put('/:id/cancel', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log(id);
    console.log(userId);
    const rental = await Rental.findOne({ _id: id, user: userId });
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Аренда не найдена' });
    }
    if (rental.status !== 'Active') {
      return res.status(400).json({ success: false, message: 'Можно отменить только активную аренду' });
    }

    rental.status = 'Cancelled';
    await rental.save();

 
    const car = await Car.findById(rental.car);
    car.available = true;
    await car.save();

    res.json({ success: true, message: 'Аренда отменена' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ошибка при отмене', error: error.message });
  }
});


export default router;