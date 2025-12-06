import express from 'express';
import { Car } from "../models/Car.js";
import authenticateJWT from '../middle.js'

const router = express.Router();



router.get('/get_all_cars',authenticateJWT, async (req, res) => {
  try {
    const cars = await Car.find({});

    
    res.json({ cars });
  } catch (error) {
    console.error('Ошибка при получении автомобилей:', error);
    res.status(500).json({ 
      success: false,
      message: 'Ошибка сервера',
      error: error.message 
    });
  }
});



router.get('/:id', async (req, res) => {
  try {

    const carId = req.params.id;
    console.log(carId)
    const car = await Car.find({_id:carId});

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Автомобиль не найден'
      });
    }

    res.json({ car });
  } catch (error) {
    console.error('Ошибка при получении автомобилей:', error);
    res.status(500).json({ 
      success: false,
      message: 'Ошибка сервера',
      error: error.message 
    });
  }
});

export default router;
