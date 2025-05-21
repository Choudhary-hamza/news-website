import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  readerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  isLiked: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const likeModel = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default likeModel;
