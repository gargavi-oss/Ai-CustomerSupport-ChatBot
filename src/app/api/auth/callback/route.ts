import { NextRequest, NextResponse } from "next/server";
import { scalekit } from "@/lib/scalekit";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URI}/api/auth/callback`;
  const session = await scalekit.authenticateWithCode(code, redirectUri);
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URI}/dashboard`);
  response.cookies.set("acess_token", session.accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    path: "/",
  });

  return response;
}
