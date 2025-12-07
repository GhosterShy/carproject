import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import authenticateJWT from '../middle.js'

const router = express.Router();

const JWT_SECRET = 'shyngys05';


router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      avatar:''
    });


    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "Пользователь зарегистрирован",
      token:token
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});






router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: 'Введите email и пароль' });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

  
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

  
    res.json({
      message: 'Успешный вход', token
    });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});








router.get('/profile', authenticateJWT, async (req, res) => {

  try {

    console.log(req.user.id)
    const user = await User.find({_id:req.user.id});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user не найден'
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Ошибка :', error);
    res.status(500).json({ 
      success: false,
      message: 'Ошибка сервера',
      error: error.message 
    });
  }
});




// router.post("/upload-avatar", authenticateJWT, async (req, res) => {
//   try {
//     const { avatarUrl } = req.body;

//     if (!avatarUrl || typeof avatarUrl !== "string") {
//       return res.status(400).json({ error: "Неверная ссылка" });
//     }

 
//     const validImageUrl = avatarUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);
//     if (!validImageUrl) {
//       return res.status(400).json({ error: "Ссылка должна вести на изображение" });
//     }

//     req.user.avatar = avatarUrl.trim();
//     await req.user.save();

//     res.json({ avatar: req.user.avatar });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Ошибка сохранения аватара" });
//   }
// });


router.post("/upload-avatar", authenticateJWT, async (req, res) => {
  try {
    const { avatarUrl } = req.body;

    if (!avatarUrl || typeof avatarUrl !== "string") {
      return res.status(400).json({ error: "Неверная ссылка" });
    }

  
    try {
      new URL(avatarUrl);
    } catch {
      return res.status(400).json({ error: "Некорректный URL" });
    }


    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(avatarUrl);
    if (!isImage) {
      return res.status(400).json({ error: "Ссылка должна вести на изображение" });
    }

  
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,                         
      { avatar: avatarUrl.trim() },         
      { new: true }                          
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ avatar: updatedUser.avatar });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});





export default router;

