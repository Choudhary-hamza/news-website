import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Politics",
      "Game",
      "Technology",
      "Sports",
      "Health",
      "Entertainment",
      "Business",
    ],
    required: true,
    unique: true,
  },
});

const categoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default categoryModel;
