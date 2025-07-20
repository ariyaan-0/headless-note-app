import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";
import uploadRoutes from "./routes/uploadRouts";

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// Db connection
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/notes", uploadRoutes);

// Root route
app.get("/", (_, res) => {
	res.send("API is running");
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
