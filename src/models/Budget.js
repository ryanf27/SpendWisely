import { Schema, model, Types } from "mongoose";

const budgetSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  limitAmount: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Budget = model("Budget", budgetSchema);

export default Budget;
