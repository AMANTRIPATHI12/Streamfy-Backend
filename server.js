import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import UserRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import { connectDB } from "./src/lib/db.js";

const app = express();
const port = process.env.PORT || 5000; // Fallback port for local testing
const __dirname = path.resolve();

const allowedOrigins = [
  "http://localhost:5173",  // Localhost for development
  "https://streamfy-frontend.vercel.app", // Your frontend URL on Vercel
  "https://streamfy-frontend-c45wagc3k-amantripathi12s-projects.vercel.app", // Optional preview link
];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/chat", chatRoutes);

// Serve Frontend (Production)
if (process.env.NODE_ENV === "production") {
  // Ensure the correct path to the 'dist' folder
  const frontendBuildPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(frontendBuildPath)); // Serve static files from frontend's dist folder

  // Catch-all route to serve index.html for all frontend routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
