import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { GET as handlerGet} from "@/app/api/auth/[...nextauth]/route";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    debugger;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    debugger;
    // Get NextAuth session
    const session = await getServerSession(handlerGet);
    if (!session) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    console.log("Session from route login:", session);
    // Return success response with token
    return NextResponse.json(
      { message: "Login successful", session },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
