import { NextRequest } from "next/server";
import { scalekit } from "./scalekit";
import { cookies } from "next/headers";

export async function getSession() {
  const session = await cookies();
  const token = session.get("acess_token")?.value;
  if (!token) {
    return null;
  }
  try {
    const result: any = await scalekit.validateToken(token);
    const user = await scalekit.user.getUser(result.sub);
    return user;
  } catch (error) {
    console.log(error);
  }
}
