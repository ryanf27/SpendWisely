import connectToDB from "@/utils/db";
import Budget from "@/models/Budget";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectToDB();

  try {
    const session = await getServerSession();

    const user = await User.findOne({ email: session?.user?.email });

    const budgets = await Budget.find({ userId: user._id });

    return NextResponse.json({ budgets }, { status: 200 });
  } catch (error) {
    console.error("An error occurred in GET budgets:", error);
    return NextResponse.json(
      { error: "Failed to get budgets" },
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

    const { limitAmount, startDate, endDate, period } = await request.json();

    const data = await Budget.create({
      userId,
      limitAmount,
      startDate,
      endDate,
      period,
    });

    return NextResponse.json(
      { data, message: "Budget created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("An error occurred in POST budget:", error);
    return NextResponse.json(
      { error: "Failed to create budget" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDB();

  try {
    const { id } = await request.json();

    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Budget deleted" }, { status: 200 });
  } catch (error) {
    console.error("An error occurred in DELETE budget:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
