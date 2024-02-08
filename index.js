import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "./routes/userRouter.js";
import ticketRouter from "./routes/ticketRouter.js";

const app = express();
const port = 7000 || process.env.PORT;

app.use(cors());
app.use(express.json()); 

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Failed to connect to database:", err);
});





app.use('/api/v1/users', userRouter);
app.use('/api/v1/ticket', ticketRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
