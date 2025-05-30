import express from 'express'
import "dotenv/config";
import cors from "cors";
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clearkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';

connectDB()

const app = express();
app.use(cors())  

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to clerk Webhooks
app.use("/api/clerk", clearkWebhooks);


app.get('/', (req, res) => res.send("API is working fine."))
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

