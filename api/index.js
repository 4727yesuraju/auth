import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

//importing router
import authRoute from './routes/auth.routes.js';

import { connectToMongoDB } from './db/connectToMongoDB.js';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

config();
const PORT = process.env.PORT || 3000;

//using routes
app.use('/api/auth',authRoute);

app.use(express.static(path.join(__dirname,"/client/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running an port ${PORT}`);
})