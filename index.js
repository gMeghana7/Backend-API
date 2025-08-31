import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "HI there STUDENT NAME G Meghana",
    project: "Backend Module PROJECT",
    github: "https://github.com/gMeghana7/Backend-API",
    deployed: "https://backend-api-pearl-xi.vercel.app/",
    project:  "React module PROJECT ",
    reactGITHUB:   "https://github.com/gMeghana7/Notes-App",
 DEPLOYED: "https://notes-app-tan-eta.vercel.app/"


  });
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
