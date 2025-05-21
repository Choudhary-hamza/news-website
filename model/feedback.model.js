import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const feedbackModel =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default feedbackModel;
