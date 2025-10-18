import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


import authRoutes from "./src/routes/auth.route.js"
import UserRoutes from "./src/routes/user.route.js"
import chatRoutes from "./src/routes/chat.route.js"
import {connectDB} from "./src/lib/db.js"


const app=express()
const port = process.env.PORT
const __dirname=path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/users",UserRoutes);
app.use("/api/chat",chatRoutes);
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

app.listen(port,()=>{
  console.log(`Server running on port ${port}`);
  connectDB();
  
});
