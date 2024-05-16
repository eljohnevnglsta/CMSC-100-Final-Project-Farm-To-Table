import express from 'express';
import cors from 'cors'; //CHANGES
import router from './router.js';

const app = express();
app.use(cors()); //ADDED CORS middleware
app.use(express.json()); //middleware to parse JSON request bodies


app.listen(3001, ()=>{console.log("Database Server Started at Port 3001");})

//pass the app instance to the router function
router(app);