import { Schema, model, Types } from "mongoose";

interface Category {
  userId: Types.ObjectId;
  name: string;
}

const categorySchema = new Schema<Category>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = model<Category>("Category", categorySchema);

export default Category;
