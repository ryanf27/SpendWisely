import User from "@/models/User";
import connectToDB from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    await connectToDB();

    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { message: "Invalid session data" },
        { status: 400 }
      );
    }
    const userData = await User.findOne({ email: userEmail });

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connectToDB();

  const session = await getServerSession();

  if (!session) {
    console.log("No session found, unauthorized access");
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { username, email, newPassword, oldPassword } = await req.json();

    if (!username || !email) {
      console.log("Required fields missing");
      return new NextResponse(
        JSON.stringify({ message: "Please fill in all required fields" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("Profile not found for email:", email);
      return new NextResponse(
        JSON.stringify({ message: "Profile not found" }),
        { status: 404 }
      );
    }

    if (newPassword && oldPassword) {
      if (!bcrypt.compareSync(oldPassword, existingUser.password)) {
        console.log("Incorrect old password for user:", existingUser);
        return new NextResponse(
          JSON.stringify({ message: "Incorrect old password" }),
          { status: 400 }
        );
      }
      console.log("Password match, updating password for user:", existingUser);
      existingUser.password = await bcrypt.hash(newPassword, 10);
    }

    existingUser.username = username;
    existingUser.email = email;

    await User.findOneAndUpdate({ email }, existingUser, { new: true });

    return new NextResponse(
      JSON.stringify({ message: "Profile updated successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error during profile update:", err);
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
