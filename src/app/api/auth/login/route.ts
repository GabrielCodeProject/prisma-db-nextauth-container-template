import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { signIn } from "next-auth/react";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("from route login: ", email, password);
    if (!email || !password) {
      console.log("email and password null?");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      console.log("user null or userpassword null");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("password null?");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    console.log("User authenticated in route login:", user.email);
    console.log("user detail in route login: ", user);

    return NextResponse.json(
      { message: "Login successful", user },
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
