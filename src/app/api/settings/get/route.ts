import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const ownerId = req.nextUrl.searchParams.get("ownerId");

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 500 }
      );
    }

    const settings = await prisma.settings.findUnique({
      where: {
        ownerId,
      },
    });

    if (!settings) {
      return NextResponse.json(
        { message: "Settings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("GET /api/settings/get:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}