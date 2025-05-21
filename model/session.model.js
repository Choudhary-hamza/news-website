import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedArticleIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Article",
    default: [],
  },
});
const sessionModel =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
export default sessionModel;
