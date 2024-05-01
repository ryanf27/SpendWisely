import Transaction from "@/models/Transaction";
import Category from "@/models/Category";
import connectToDB from "@/utils/db";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  try {
    const { amount, categoryId, date, description, type } =
      await request.json();

    if (!amount || !categoryId || !date || !type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await Transaction.findByIdAndUpdate(
      params.id,
      {
        amount,
        categoryId,
        date,
        description,
        type,
      },
      { new: true }
    );

    return NextResponse.json(
      { data, message: "Transaction updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred in PUT transaction:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
