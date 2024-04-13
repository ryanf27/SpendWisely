import { Schema, model, Types } from "mongoose";

interface Budget {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  limitAmount: number;
  period: "monthly" | "yearly";
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new Schema<Budget>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
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

const Budget = model<Budget>("Budget", budgetSchema);

export default Budget;
