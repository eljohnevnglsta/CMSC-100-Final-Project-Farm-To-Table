import express from 'express';
import cors from 'cors';
import router from './router.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only requests from this origin
  credentials: true
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log("Database Server Started at Port 3001");
});

router(app);
