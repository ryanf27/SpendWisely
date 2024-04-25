import connectToDB from "@/utils/db";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import Category from "@/models/Category";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectToDB();

  try {
    const session = await getServerSession();

    const user = await User.findOne({ email: session?.user?.email });

    const userCategories = await Category.find().where("userId", user?._id);
    const transactions = await Transaction.find();

    return NextResponse.json({ transactions, userCategories }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
export async function POST(request: NextRequest) {
  console.log("Connecting to DB...");
  await connectToDB();

  try {
    console.log("Getting server session...");
    const session = await getServerSession();

    console.log("Finding user by email...");
    const userId = await User.findOne({ email: session?.user?.email }).select(
      "_id"
    );
    console.log("userId", userId);

    console.log("Parsing request body...");
    const { amount, categoryId, date, description, type } =
      await request.json();

    console.log(amount, categoryId, date, description, type);

    console.log("Creating transaction...");
    await Transaction.create({
      userId,
      amount,
      categoryId,
      date,
      description,
      type,
    });

    console.log(
      "Transaction created successfully. Sending success response..."
    );
    return NextResponse.json(
      { message: "Transaction created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("An error occurred in POST transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

export async function PUT(req: any, res: any) {
  await connectToDB();
  const transaction = await Transaction.findByIdAndUpdate(req.query.id);
  res.status(200).json({ success: true, data: transaction });
}

export async function DELETE(req: any, res: any) {
  await connectToDB();
  const transaction = await Transaction.findByIdAndDelete(req.query.id);
  res.status(200).json({ success: true, data: transaction });
}
