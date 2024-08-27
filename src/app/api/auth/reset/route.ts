import { signToken } from "@/actions/auth/signToken";
import { fetchUser } from "@/actions/user/fetchUser";
import ResetPass from "@/components/emails/ResetPass";
import { sendEmail } from "@/tools/sendEmail";
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const user = await fetchUser({ email: data.email });

    if (!user?.id) {
      NextResponse.json({ status: 404 });
      return;
    }

    const user_token = await signToken({ data: { id: user.id } });

    const url = `${process.env.NEXT_PUBLIC_HOST}/auth/reset/${user_token}`;

    await sendEmail({
      html: render(ResetPass({ magicLink: url })),
      to: data.email,
    });

    return NextResponse.json({ status: 200 });
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
