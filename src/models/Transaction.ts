import { Schema, model, Types } from "mongoose";

interface Transaction {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  amount: number;
  type: "income" | "expense";
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<Transaction>({
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
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 255,
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

const Transaction = model<Transaction>("Transaction", transactionSchema);

export default Transaction;
