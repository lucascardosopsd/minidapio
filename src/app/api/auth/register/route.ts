import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hashPassword";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const { email, password, name } = data;

    const exists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: "User aready exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword({ password });

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Allowed" }, { status: 200 });
}
