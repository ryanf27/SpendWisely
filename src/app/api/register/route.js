import User from "@/models/User";
import connectToDB from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDB();
  try {
    const userData = await request.json();
    const { username, email, password } = userData;

    const userExists = await User.findOne({ email }).lean().exec();
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
