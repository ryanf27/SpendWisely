import Budget from "@/models/Budget";
import connectToDB from "@/utils/db";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  const budget = await Budget.findById(params.id);

  if (!budget) {
    return NextResponse.json({ message: "Budget not found" }, { status: 404 });
  }

  return NextResponse.json({ budget }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  try {
    const { limitAmount, period, startDate, endDate } = await request.json();

    if (!limitAmount || !period || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await Budget.findByIdAndUpdate(
      params.id,
      {
        limitAmount,
        period,
        startDate,
        endDate,
      },
      { new: true }
    );

    if (!data) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data, message: "Budget updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred in PUT budget:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
