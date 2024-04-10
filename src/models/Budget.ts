import { Schema, model, Types } from "mongoose";

interface Budget {
  amount: number;
  period: "Yearly" | "Monthly" | "Weekly" | "Daily";
  categoryID: Types.ObjectId;
  userID: Types.ObjectId;
}

const budgetSchema = new Schema<Budget>({
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value > 0,
      message: (props) =>
        `${props.value} is not a valid amount. Budget amount must be positive.`,
    },
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Budget = model<Budget>("Budget", budgetSchema);

module.exports = Budget;
