import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Book API running successfully ",
    

  });
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
