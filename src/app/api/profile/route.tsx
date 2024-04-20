import User from "@/models/User";
import connectToDB from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDB();

    const session = await getServerSession();

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userEmail = session?.user?.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Invalid session data" });
    }
    const userData = await User.findOne({ email: userEmail });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // const sanitizedUser = {
    //   id: userData._id,
    //   username: userData.username,
    //   email: userData.email,
    //   password:userData.password
    // };
    console.log("session", userData);
    return NextResponse.json({ userData, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
