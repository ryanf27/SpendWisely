import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectToDB();
  const data = await Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $match: {
        type: "income",
      },
    },
    {
      $group: {
        _id: "$categoryId",
        categoryName: { $first: "$category.name" },
        totalIncome: { $sum: "$amount" },
      },
    },
    {
      $sort: { totalExpense: -1 },
    },
  ]);

  return NextResponse.json({ data }, { status: 200 });
}
