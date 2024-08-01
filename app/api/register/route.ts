import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/database/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const existing = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existing) {
      return new NextResponse(
        "This email is already associated with an account.",
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("REGISTRATION_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
