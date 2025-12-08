import express from "express";
import connectDB from './database.js'
import cors from "cors";
import auth from './routes/auth.js';
import cars from './routes/cars.js';
import comments from './routes/comments.js' 
import rentals  from './routes/rental.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));






connectDB();

app.use('/auth', auth);
app.use('/cars', cars);
app.use('/cars', comments); 
app.use('/rental',rentals);





if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}