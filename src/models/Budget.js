import { Schema, model, Types, models } from "mongoose";

const budgetSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  limitAmount: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
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

const Budget = models?.Budget || model("Budget", budgetSchema);

export default Budget;
