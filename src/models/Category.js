import { Schema, model, Types, models } from "mongoose";

const categorySchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
