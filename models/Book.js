import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
   genre: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  description: { type: String },
  publishedYear: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
