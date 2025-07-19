import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app= express();

app.use(cors({
    origin: "https://scribly-frontend-j8ps.vercel.app",
    credentials: true 
}))



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser());

//route import
import userRouter from './routes/user.routes.js';
import noteRouter from './routes/notes.route.js';
// route use
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);
export {app};
