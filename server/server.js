import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./Routes/userRoutes.js";
import resumeRouter from "./Routes/resumeRoutes.js";
import aiRouter from "./Routes/aiRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
await connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Server is live")
})
app.use('/api/user', userRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => {
    console.log(`Sever is runing on port ${PORT} `)
});

