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
    console.error("An error occurred in GET transaction:", error);
    return NextResponse.json(
      { error: "Failed to get transaction" },
      { status: 500 }
    );
  }
}

export async function getById(request: NextRequest) {
  await connectToDB();
  const { id } = await request.json();

  try {
    const transaction = await Transaction.findById(id);

    return NextResponse.json({ transaction }, { status: 200 });
  } catch (error) {
    console.error("An error occurred in GET transaction:", error);
    return NextResponse.json(
      { error: "Failed to get transaction" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectToDB();

  try {
    const session = await getServerSession();

    const userId = await User.findOne({ email: session?.user?.email }).select(
      "_id"
    );

    const { amount, categoryId, date, description, type } =
      await request.json();

    const data = await Transaction.create({
      userId,
      amount,
      categoryId,
      date,
      description,
      type,
    });

    return NextResponse.json(
      { data, message: "Transaction created" },
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

export async function DELETE(request: NextRequest) {
  await connectToDB();

  try {
    const { id } = await request.json();

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
