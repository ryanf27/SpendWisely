import User from "@/models/User";
import connectToDB from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import seedCategories from "../../../seeders/CategorySeeder";

export async function POST(request) {
  await connectToDB();
  console.log("Database connected.");
  try {
    const userData = await request.json();
    const { username, email, password } = userData;
    console.log("Received user data:", { username, email });

    const userExists = await User.findOne({ email }).lean().exec();
    if (userExists) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("Password encrypted.");

    const newUser = await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    console.log("New user created:", newUser);

    await seedCategories(newUser._id);
    console.log("Categories seeded for user:", newUser._id);

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
