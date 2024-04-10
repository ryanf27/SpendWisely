import { Schema, model } from "mongoose";

interface Category {
  name: string;
  type: "Expense" | "Income";
}

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
  },
  type: { type: String, enum: ["Expense", "Income"], required: true },
});

const Category = model<Category>("Category", categorySchema);

module.exports = Category;
