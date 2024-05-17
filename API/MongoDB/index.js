import express from 'express';
import cors from 'cors';
import router from './router.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(3001, () => { console.log("Database Server Started at Port 3001"); })

router(app);