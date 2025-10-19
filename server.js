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
const __dirname = path.resolve();

// ✅ Allow both local dev & production frontend
const allowedOrigins = [
  "http://localhost:5173",                 // local
  "https://streamfy-frontend.vercel.app"   // production (Vercel)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Serve frontend *only if deployed together* (not needed if hosting separately)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  connectDB();
});
