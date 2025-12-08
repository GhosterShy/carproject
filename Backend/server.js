import express from "express";
import connectDB from './database.js'
import cors from "cors";
import auth from './routes/auth.js';
import cars from './routes/cars.js';
import comments from './routes/comments.js'; 
import rentals  from './routes/rental.js';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
console.log("MONGODB_URI загружен:", process.env.MONGODB_URI ? "Да" : "НЕТ");

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET не найден в .env файле!");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: true,
    credentials: true
}));






connectDB();

app.use('/auth', auth);
app.use('/cars', cars);
app.use('/cars', comments); 
app.use('/rental',rentals);


app.get("/", (req, res) => {
  res.json({ message: "Car Rental API работает!", time: new Date() });
});




const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server запущен на порту ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});