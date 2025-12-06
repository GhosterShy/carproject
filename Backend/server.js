import express from "express";
import connectDB from './database.js'
import cors from "cors";
import auth from './routes/auth.js';
import cars from './routes/cars.js';
import comments from './routes/comments.js' 


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());




connectDB();

app.use('/auth', auth);
app.use('/cars', cars);
app.use('/cars', comments); 


if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}