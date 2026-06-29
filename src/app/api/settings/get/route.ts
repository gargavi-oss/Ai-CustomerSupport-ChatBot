import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { ownerId } = await req.json();
    if (!ownerId) {
      return NextResponse.json({
        message: "Owner is required",
        status: 400,
      });
    }
    const settings = await prisma.settings.findUnique({
      where: {
        ownerId,
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({
      message: `Settings error ${error}`,
      status: 400,
    });
  }
}
