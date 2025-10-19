import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import { connectDB } from "./src/lib/db.js";

const app = express();
const port = process.env.PORT || 5501;

// ✅ Allowed frontend URLs (both local + deployed)
const allowedOrigins = [
  "http://localhost:5173",
  "https://streamfy-frontend.vercel.app",
  "https://streamfy-frontend-c45wagc3k-amantripathi12s-projects.vercel.app",
];

// ✅ Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  connectDB();
});
