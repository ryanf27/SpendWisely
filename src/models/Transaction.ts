import { Schema, model, Types } from "mongoose";

interface Transaction {
  type: "Expense" | "Income";
  amount: number;
  categoryID: Types.ObjectId;
  date: Date;
  description?: string;
  userID: Types.ObjectId;
}

const transactionSchema = new Schema<Transaction>({
  type: {
    type: String,
    enum: ["Expense", "Income"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value > 0,
      message: (props) =>
        `${props.value} is not a valid amount. Transaction amount must be positive.`,
    },
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Transaction = model<Transaction>("Transaction", transactionSchema);

export default Transaction;
