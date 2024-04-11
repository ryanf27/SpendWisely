import { connectToDB } from "@/utils/db";
import Transaction from "@/models/Transaction";

export async function POST(req: any, res: any) {
  await connectToDB();
  const transaction = await Transaction.create(req.body);
  res.status(201).json({ success: true, data: transaction });
}

export async function GET(req: any, res: any) {
  await connectToDB();
  const transactions = await Transaction.find();
  res.status(200).json({ success: true, data: transactions });
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
