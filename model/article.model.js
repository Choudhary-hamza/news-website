import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const articleModel =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
export default articleModel;
