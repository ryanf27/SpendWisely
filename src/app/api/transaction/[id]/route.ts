import Transaction from "@/models/Transaction";
import Category from "@/models/Category";
import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const transaction = await Transaction.findById(params.id);

  const category = await Category.findById(transaction.categoryId).select(
    "name"
  );

  if (!transaction) {
    return NextResponse.json(
      { message: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ transaction, category }, { status: 200 });
}
