import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectToDB();

  const data = await Transaction.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$date" },
        },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        income: 1,
        expense: 1,
      },
    },
  ]);

  const completeData = [];
  for (let i = 1; i <= 12; i++) {
    const found = data.find((item) => item.month === i);
    if (found) {
      completeData.push({ ...found, date: i });
    } else {
      completeData.push({ expense: 0, income: 0, date: i });
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const responseData = completeData.map((item) => ({
    ...item,
    date: monthNames[item.date - 1],
  }));

  return NextResponse.json({ responseData });
}
