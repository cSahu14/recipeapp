import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv"
import {userRouter} from "./routes/users.js"

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/auth", userRouter)

mongoose.connect(process.env.MONGO_URL)

app.listen(3001, () => console.log(`Server started.`))